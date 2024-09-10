import { Navbar } from "@/components/ui/custom/Navbar";
import { useState } from "react";
import { ProfileOptions } from "@/components/ui/custom/profile-options";
import { ProfileInfo } from "@/components/ui/custom/profile_info";
import { ProfilePictureComponent } from "@/components/ui/custom/profile_picture_component";
import { FaArrowRight } from "react-icons/fa";

export function ProfileTemplate() {
	return (
		<>
			{/* entire screen  */}
			<section className="flex flex-col items-center overflow-hidden ">
				<Navbar />
				{/* personal details such as name,email,phonenumber */}
				<div className="flex flex-col items-center bg-white w-8/12 rounded-2xl mt-8 mb-8  pb-10">
					<ProfilePictureComponent />
					<ProfileInfo />

					{/* bio */}
					<div className="w-7/12 mt-6">
						<h1 className="text-xl font-bold mb-4">Bio</h1>
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae
							numquam atque eum vitae. Eveniet officia voluptate facilis rem
							expedita sit aut sint hic voluptatum, ea, totam, sapiente tenetur
							nostrum culpa. Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Quas, nostrum magnam quisquam laboriosam, optio debitis
							doloribus eveniet est asperiores sunt, incidunt omnis vitae enim
							voluptate obcaecati molestiae? Dolore, a blanditiis?
						</p>
						<div className="flex items-center justify-between w-12 text-blue-500 hover:cursor-pointer mt-3">
							<p>Edit</p>
							<FaArrowRight />
						</div>
					</div>
					{/* section to improve job matches */}
					<div className="flex flex-col w-7/12 mt-4 ">
						<ProfileOptions
							heading="Qualifications"
							subheading="Highlight your skills and experience"
						/>
						<ProfileOptions
							heading="Job prefrences"
							subheading="Save specific details like minimum desired pay and schedule"
						/>
						<ProfileOptions
							heading="Ready to work"
							subheading="Let employers know that you're available to start working as soon as possible"
						/>
					</div>
				</div>
			</section>
		</>
	);
}
