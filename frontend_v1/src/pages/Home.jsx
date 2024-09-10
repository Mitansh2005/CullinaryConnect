import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/custom/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import {
HoverEffect,
	Card,
	CardDescription,
	CardTitle,
} from "@/components/ui/card-hover-effect";
import { JobData,JobTitle } from "@/services/api/jobs-data";

function jobTitle({JobTitle}){
	return(
		<ul>
		{jobTitle.map((job) => (
			<li key={job.jobId} className="job-item">
				{job.title}
			</li>
		))}
	</ul>
	)
}
export const HomeTemplate=()=> {
	const [jobKeyword, setJobKeyword] = useState("");
	const [locationKeyword, setLocationKeyword] = useState("");
  const { jobData, loading } = JobData();
	const handleJobForm = (e) => {
		e.preventDefault();
		console.log("jobtitle:" + jobKeyword);
		console.log("location: " + locationKeyword);
  };
	const projects = [
		{
			title: "Stripe",
			description:
				"A technology company that builds economic infrastructure for the internet.",
			link: "https://stripe.com",
		},
		{
			title: "Netflix",
			description:
				"A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
			link: "https://netflix.com",
		},
		{
			title: "Google",
			description:
				"A multinational technology company that specializes in Internet-related services and products.",
			link: "https://google.com",
		},
		{
			title: "Meta",
			description:
				"A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
			link: "https://meta.com",
		},
		{
			title: "Amazon",
			description:
				"A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
			link: "https://amazon.com",
		},
		{
			title: "Microsoft",
			description:
				"A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
			link: "https://microsoft.com",
		},
	];
	return (
		<>
			{/* home */}
			<section className=" min-h-screen flex flex-col items-center ">
				<Navbar />
				{/* <!-- Search Bar Container --> */}
				<form onSubmit={handleJobForm}>
					<div className="flex items-center bg-white shadow-lg rounded-full px-5 py-2 mt-8   w-fit ">
						{/* <!-- Job Title Search Input --> */}
						<div className="flex items-center ">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512"
								className="w-4 h-4  mr-2"
							>
								<path
									fill="#6b7280"
									d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
								/>
							</svg>
							<input
								type="text"
								placeholder="Job title, keywords, or company"
								value={jobKeyword}
								onChange={(e) => {
									setJobKeyword(e.target.value);
								}}
								className="focus:outline-none w-64 "
							/>
						</div>

						{/* <!-- Divider --> */}
						<div className="border-l h-8 mx-4"></div>

						{/* <!-- Location Search Input --> */}
						<div className="flex items-center">
							<svg
								className="h-5 w-5 text-gray-500 mr-2"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M10 2a6 6 0 016 6c0 5-6 10-6 10S4 13 4 8a6 6 0 016-6zm0 8a2 2 0 100-4 2 2 0 000 4z" />
							</svg>
							<input
								type="text"
								placeholder='City, state, zip code, or "remote"'
								className="focus:outline-none w-64"
								value={locationKeyword}
								onChange={(e) => {
									setLocationKeyword(e.target.value);
								}}
							/>
						</div>

						{/* <!-- Search Button --> */}
						<Button className="rounded-3xl px-6" onSubmit={handleJobForm}>
							Find jobs
						</Button>
					</div>
				</form>
				{/* <section className="grid grid-cols-2 gap-4 mt-16 p-4 w-full"> */}
				<HoverEffect items={projects} className=""></HoverEffect>
				{/* </section> */}
			</section>
		</>
	);
}
