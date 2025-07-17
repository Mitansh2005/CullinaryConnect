import { useState } from "react";
import { ProfileOptions } from "@/components/ui/custom/profile_component/profile-options";
import { ProfileInfo } from "@/components/ui/custom/profile_component/profile_info";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { NormalButtons } from "@/components/ui/ui_buttons";
import { getUid } from "@/firebase/authUtils";
import ProfilePictureUploader from "@/components/ui/custom/profile_component/profile_picture_uploader";
import defaultPic from "../assets/profile.png";
import { baseUrl } from "@/constants/constants";
import DOMpurify from "dompurify";
export function ProfileTemplate() {
	const savedUserdata = JSON.parse(localStorage.getItem("userData"));
	const bio = savedUserdata?.bio;
	const bioLength = savedUserdata?.bio?.length || 0;
	const username = savedUserdata?.username;
	const uid = getUid();

	const sanitizedHtml = (html)=>{
		DOMpurify.sanitize(html, {
			ALLOWED_TAGS: ["b", "i", "em", "strong", "p", "br"],
		});
	}
	const maxLength = 100;
	const [showPopup, setShowPopup] = useState(false);
	const [content, setContent] = useState("profile");
	const [availablity, setAvailability] = useState("");
	const [jobPreference, setJobPreference] = useState("");
	const [qualifications, setQualifications] = useState("");
	const navigate = useNavigate();
	const setAvailabilityStatus = (e) => {
		e.preventDefault();
		console.log("hi");
		setShowPopup(true);
	};
	const handleAvailability = (e) => {
		setAvailability(e.target.value);
		console.log(availablity);
		setShowPopup(false);
	};
	const handleJobPreference = (e) => {
		setJobPreference(e.target.value);
		console.log(jobPreference);
		setShowPopup(false);
	};
	const handleQualifications = (e) => {
		setQualifications(e.target.value);
		console.log(qualifications);
	};
	const saveQualifications = () => {
		setShowPopup(false);
	};
	const saveJobPreference = () => {
		setShowPopup(false);
	};
	const renderContent = () => {
		if (content === "availability") {
			return (
				<>
					<div className="flex flex-col justify-end items-center bg-white w-4/12 rounded-2xl mt-8 mb-8 p-4">
						<Link to="/profile">
							<FaArrowLeft className="mb-3 text-lg hover:cursor-pointer hover:text-red-600 " />
						</Link>
						<label className="m-4 text-2xl ">
							Set Your Availability Status Here
						</label>
						<select
							className="outline-none border-2 w-7/12 p-2 rounded-md duration-100 ease-linear focus:bg-blue-200 focus:border-blue-400 "
							value={availablity}
							onChange={handleAvailability}
						>
							<option disabled value="">
								--Select one option--
							</option>
							<option value="available">Available to Start</option>
							<option value="looking">Just Looking</option>
							<option value="not_ready">Not Ready</option>
						</select>
					</div>
				</>
			);
		} else if (content === "job_preference") {
			return (
				<>
					<div className="flex flex-col justify-end items-center bg-white w-4/12 rounded-2xl mt-8 mb-8 p-4">
						<Link to="/profile">
							<FaArrowLeft className="mb-3 text-lg hover:cursor-pointer hover:text-red-600 " />
						</Link>
						<label className="m-4 text-2xl ">
							Set Your Job Preferences Here
						</label>
						<select
							className="outline-none border-2 w-7/12 p-2 rounded-md duration-100 ease-linear focus:bg-blue-200 focus:border-blue-400 "
							value={jobPreference}
							onChange={handleJobPreference}
						>
							<option disabled value="">
								--Select one option--
							</option>
							<option value="full_time">Full Time</option>
							<option value="part_time">Part Time</option>
						</select>
						<NormalButtons onClick={saveJobPreference}>Save</NormalButtons>
					</div>
				</>
			);
		} else if (content === "qualifications") {
			return (
				<>
					<div className="flex flex-col justify-end items-center bg-white w-4/12 rounded-2xl mt-8 mb-8 p-4">
						<Link to="/profile">
							<FaArrowLeft className="mb-3 text-lg hover:cursor-pointer hover:text-red-600 " />
						</Link>
						<label className="mb-3">
							Talk about your qualifications and achivements in this section in
							brief
						</label>
						<textarea
							className="w-full resize-none outline-none overflow-auto p-2 duration-75 ease-linear rounded-md focus:border-b-4 border-custom_color1 transition-all"
							placeholder="Tell employer more about yourself here"
							rows="3" // Start with one row; it will expand as needed
							onFocus={(e) => {
								// Adjust the textarea height based on content
								e.target.style.height = "auto";
								e.target.style.height = e.target.scrollHeight + "px";
							}}
							name="qualifications"
							value={qualifications}
							onChange={handleQualifications}
						></textarea>
						<NormalButtons onClick={saveQualifications}>Save</NormalButtons>
					</div>
				</>
			);
		} else {
			return <p>Invalid !</p>;
		}
	};
	return (
		<>
			{/* entire screen  */}
			<section className="flex flex-col items-center overflow-hidden ">
				{!showPopup ? (
					<div className="flex flex-col items-center bg-white w-8/12 rounded-2xl mt-8 mb-8  pb-10">
						<ProfilePictureUploader
							id={uid}
							username={username}
							defaultImage={defaultPic}
							getProfileUrl={`${baseUrl}/profile_detail`}
							uploadUrl={`${baseUrl}/upload`}
						/>
						<ProfileInfo />

						<div className="w-7/12 mt-6 ">
							<h1 className="text-xl font-bold mb-4">Bio</h1>
							<div className="flex justify-between items-end m-3">
								<p
									dangerouslySetInnerHTML={{
										__html:
											bioLength > maxLength
												? sanitizedHtml(bio.slice(0, maxLength) + "...")
												: sanitizedHtml(bio) || "Tell us about yourself here",
									}}
								></p>
								<Link to="/bio">
									<div className="flex items-center justify-between w-12  hover:cursor-pointer mt-3">
										<MdOutlineArrowForwardIos className="hover:text-custom_color1" />
									</div>
								</Link>
							</div>
						</div>
						<div className="flex flex-col w-7/12 mt-4 ">
							<ProfileOptions
								heading="Qualifications"
								subheading="Highlight your skills and experience"
								onClickEvent={() => {
									setShowPopup(true);
									setContent("qualifications");
								}}
							/>
							<ProfileOptions
								heading="Job prefrences"
								subheading="Save specific details like minimum desired pay and schedule"
								onClickEvent={() => {
									setShowPopup(true);
									setContent("job_preference");
								}}
							/>
							<ProfileOptions
								heading="Ready to work"
								subheading="Let employers know that you're available to start working as soon as possible"
								onClickEvent={() => {
									setShowPopup(true);
									setContent("availability");
								}}
							/>
						</div>
					</div>
				) : (
					renderContent()
				)}
			</section>
		</>
	);
}
