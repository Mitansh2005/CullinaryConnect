import { useState, useEffect } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { getFreshIdToken } from "@/firebase/authUtils";

export default function ProfilePictureUploader({
  id,
  username,
  getProfileUrl = `/api/profile_detail/`,
  uploadUrl = `/api/upload`,
  defaultImage,
  className = "",
}) {
  const [imageUpdated, setImageUpdated] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState("");

  // Utility: base64 to blob
  function b64toBlob(b64Data, contentType = "", sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = Array.from(slice).map((ch) => ch.charCodeAt(0));
      byteArrays.push(new Uint8Array(byteNumbers));
    }

    return new Blob(byteArrays, { type: contentType });
  }

  // Fetch existing image
  useEffect(() => {
    if (!id) return;

    const getImage = async () => {
      try {
        const token = await getFreshIdToken(true);
        const res = await axios.get(`${getProfileUrl}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const image = res.data.profile_picture || res.data.logo;
        if (image) {
          const blob = b64toBlob(image, "image/jpeg");
          const blobUrl = URL.createObjectURL(blob);
          setProfileImageUrl(blobUrl);
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };

    getImage();

    return () => {
      if (profileImageUrl) {
        URL.revokeObjectURL(profileImageUrl);
      }
    };
  }, [id, imageUpdated]);

  // Handle upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 900,
      });

      const reader = new FileReader();
      reader.onload = async () => {
        const base64Image = reader.result.split(",")[1];
        console.log(base64Image);
        try {
          const token = await getFreshIdToken(true);
          await axios.post(
            uploadUrl,
            JSON.stringify({ image: base64Image, id }),
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setImageUpdated((prev) => !prev);
        } catch (err) {
          console.error("Image upload failed:", err);
        }
      };
      reader.readAsDataURL(compressed);
    } catch (err) {
      console.error("Error compressing/uploading:", err);
    }
  };

  return (
    <div className={`flex items-center justify-between space-x-6 p-12 w-full max-w-lg ${className}`}>
      <div>
        <h2 className="text-4xl font-bold">
          {username?.toUpperCase() || "USERNAME"}
        </h2>
      </div>
      <div className="relative">
        <img
          className="h-16 w-16 p-1 rounded-full object-cover bg-gray-100"
          src={profileImageUrl || defaultImage}
          alt="Profile"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}
