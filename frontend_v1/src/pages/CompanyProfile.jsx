import ProfilePictureUploader from "@/components/ui/custom/profile_component/profile_picture_uploader";
import CompanyIcon from "../assets/company-icon.png";
import { useEffect, useState } from "react";
import { getFreshIdToken } from "@/firebase/authUtils";
import axios from "axios";
import { baseUrl } from "@/constants/constants";
import { ImLocation2 } from "react-icons/im";
import { Link } from "react-router-dom";
import DOMPurify from 'dompurify';

export const CompanyProfileTemplate = () => {
	const savedUserdata = JSON.parse(localStorage.getItem("userData"));
	const currentUserId = savedUserdata?.user_id || "";
	const sizeMap = {
		small: "1-50 employees",
		medium: "51-250 employees",
		large: "251-1000 employees",
		enterprise: "1000+ employees",
	};
	const [companyData, setCompanyData] = useState({
		id: "",
		name: "",
		logo: CompanyIcon,
		size: 0,
		description: "",
		location: {
			country: "",
			state: "",
			city: "",
			postal_code: "",
		},
		fssaiLicenseNo: "",
		startDate: "",
	});
	function getCompanySizeLabel(size) {
		return sizeMap[size] || "Not specified";
	}
	const fetchCompanyData = async () => {
		try {
			const token = await getFreshIdToken(true);
			const res = await axios.get(`${baseUrl}/company/user/${currentUserId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const data = res.data;
			console.log("Company data fetched:", data);
			if (!data) {
				console.warn("No company data found for this user.");
				return;
			} else {
				setCompanyData({
					id: data.id,
					name: data.name,
					logo: data.logo || CompanyIcon,
					size: data.size || "Not specified",
					description: data.description || "",
					location: {
						country: data.location?.country || "",
						state: data.location?.state || "",
						city: data.location?.city || "",
						postal_code: data.location?.postal_code || "",
					},
					fssaiLicenseNo: data.fssai_license_no || "",
					startDate: data.created_at || "",
				});
			}
			
		} catch (error) {
			console.error("Error fetching company data by userId:", error);
		}
	};
	useEffect(() => {
		fetchCompanyData();
	}, []);

	const sanitizedHtml = (data) => DOMPurify.sanitize(data);
	return (
		<>
			<section className="flex flex-col items-center overflow-hidden ">
				<div className="relative flex flex-col items-center bg-white w-8/12 rounded-3xl mt-8 mb-8 pb-8 px-8 shadow-md space-y-6">
					{/* Profile Uploader */}
					<ProfilePictureUploader
						id={companyData.id}
						username={companyData.name}
						defaultImage={companyData.logo}
						getProfileUrl={`${baseUrl}/company`}
						uploadUrl={`${baseUrl}/company/upload_logo/${companyData.id}`}
						className="pb-4 "
					/>
					<div className="w-full border-t border-gray-200 -mt-36"></div>
					{/* Company name */}
					<h1 className="text-2xl font-semibold text-gray-800">
						{companyData.name}
					</h1>

					{/* Company description */}
					<p className="text-base text-gray-600 max-w-2xl text-center leading-relaxed">
						<span dangerouslySetInnerHTML={{ __html: sanitizedHtml(companyData.description) || "Not Specified" }} />
					</p>

					{/* Details grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl text-gray-700">
						<div className="flex flex-col p-4 bg-gray-50 rounded-lg space-y-1">
							<span className="text-xs text-gray-500">FSSAI License</span>
							<span className="text-base font-medium">
								{companyData.fssaiLicenseNo}
							</span>
						</div>
						<div className="flex flex-col p-4 bg-gray-50 rounded-lg space-y-1">
							<span className="text-xs text-gray-500">Company Size</span>
							<span className="text-base font-medium">{getCompanySizeLabel(companyData.size)}</span>
						</div>
						<div className="flex flex-col p-4 bg-gray-50 rounded-lg space-y-1">
							<span className="text-xs text-gray-500">Location</span>
							<span className="text-base font-medium flex items-center gap-1">
								<ImLocation2 className="text-gray-500" />
								{companyData.location?.country || "Not specified"},{" "}
								{companyData.location?.state || "Not specified"},{" "}
								{companyData.location?.city || "Not specified"},{" "}
								{companyData.location?.postal_code || "Not specified"}
							</span>
						</div>
						<div className="flex flex-col p-4 bg-gray-50 rounded-lg space-y-1">
							<span className="text-xs text-gray-500">Founded</span>
							<span className="text-base font-medium">
								{companyData.startDate?.split("T")[0]}
							</span>
						</div>
					</div>

					{/* Divider */}
					<div className="w-full border-t border-gray-200 mt-4"></div>

					{/* Edit button at bottom-right */}
					<div className="flex justify-end w-full max-w-3xl">
						<Link to="/edit-company-profile" state={{ companyData }}>
							<button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-base">
								Edit Profile
							</button>
						</Link>
					</div>
				</div>
			</section>
		</>
	);
};
