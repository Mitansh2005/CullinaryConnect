import profilepic from "../../../assets/profile.png";
import { useState } from "react";
export function ProfilePictureComponent() {
	const [profileImage, setProfileImage] = useState(null);

	const handleImageChange = (event) => {
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setProfileImage(e.target.result);
			};
			reader.readAsDataURL(event.target.files[0]);
		}
	};
	return (
		<>
			<div className="flex items-center justify-between space-x-6 p-12 w-6/12">
				<div>
					<h2 className="text-3xl font-bold ">Mitansh Pithadia</h2>
				</div>
				<div className="relative items-center">
					<img
						className="h-16 w-16 rounded-full object-cover m-2  text- bg-gray-100"
						src={profileImage || profilepic}
						alt="Profile"
					/>
					<input
						type="file"
						accept="image/*"
						onChange={handleImageChange}
						className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
					/>
				</div>
			</div>
		</>
	);
}
