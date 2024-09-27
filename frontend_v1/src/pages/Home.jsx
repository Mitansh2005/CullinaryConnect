import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/custom/Navbar";
import UpArrow from "../assets/uparrow.png";
import { useEffect, useState } from "react";
import { Jobs } from "@/services/api/jobs-data";
import { JobCards } from "@/components/ui/custom/job-cards";
import { TbError404 } from "react-icons/tb";
import { MdError } from "react-icons/md";
import Spinner from "@/components/ui/custom/spinner";
import FiltersDropdown from "@/components/ui/custom/filters";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
export const HomeTemplate = () => {
	// Updates the state of job keyword user enters in the search bar
	const [jobKeyword, setJobKeyword] = useState("");
	//Updates the state of location keyword user enters in the search bar
	const [locationKeyword, setLocationKeyword] = useState("");
	//Sets the error message in the search bar
	const [error, setError] = useState("");
	//Stores the data of all the jobs
	const { jobs, loading } = Jobs();
	//Stores the locations of the jobs
	const [locations, setLocations] = useState([]);
	//Helps to check the state of job search bar if it is in focus or not
	const [isJobFocused, setIsJobFocused] = useState(false);
	//Helps to check the state of location search bar if it is in focus or not
	const [isLocationFocused, setIsLocationFocused] = useState(false);
	// Helps in rendering of the jobs user searchs in the search bar
	const [allJobs, setAllJobs] = useState([]);
	//Helps to check the state of search ie. "" ,"error","success"
	const [searchState, setSearchState] = useState("");

	//Empty string this will hold the data of all the search jobs like there salary, employement type etc
	const matchedJobs = [];
	useEffect(() => {
		if (jobs) {
			const locations = [...new Set(jobs.map((item) => item.city))];
			setLocations(locations);
		}
	}, [jobs]);

	const handleLocationClick = (location) => {
		const currentLocKeywords = locationKeyword
			.split(",")
			.map((keyword) => keyword.trim());
		if (currentLocKeywords.includes(location)) {
			alert(`${location} is already selected`);
			return;
		}
		if (locationKeyword.trim() === "") {
			setLocationKeyword(location);
		} else {
			setLocationKeyword((prev) => `${prev}${location}`);
		}
	};
	//Handles the jobsearch input dropdown lets the user enter multiple jobs on clicking the title in dropdown
	const handleDropdownClick = (title) => {
		// Split the jobKeyword by commas to get an array of titles
		const currentKeywords = jobKeyword
			.split(",")
			.map((keyword) => keyword.trim());

		// Check if the selected title already exists in the array
		if (currentKeywords.includes(title)) {
			alert(`${title} is already selected`);
			return;
		}
		if (jobKeyword.trim() === "") {
			// This checks if there is any title already in the input
			setJobKeyword(title); // As there is no title it adds one
		} else {
			setJobKeyword((prev) => `${prev}${title}`); // Otherwise it adds the new one behind the previous one separed by a comma(,)
		}
	};
	// Handles the submission of search bar of the home page this includes the jobsearch input and location input
	const handleJobForm = async (e) => {
		e.preventDefault(); // prevents the webpage from reloading
		const jobKeywordsArray = jobKeyword
			.split(",")
			.map((job) => job.trim())
			.filter((job) => job !== ""); //spilts the jobkeyword by "," and saves it in array

		const locationsKeywordsArray = locationKeyword
			.split(",")
			.map((loc) => loc.trim()) //spilts the jobkeyword by "," and saves it in array
			.filter((loc) => loc !== ""); // Removes empty strings
		//This is just to console the response ( Remove in production )
		console.log("jobtitle:" + jobKeywordsArray);
		console.log("location: " + locationsKeywordsArray);

		//Clear the matchedJobs before new search
		matchedJobs.length = 0;

		//Check if job keyword array is not empty, then process jobsearch
		if (jobKeywordsArray.length > 0 && jobKeywordsArray[0] !== "") {
			await Promise.all(
				jobKeywordsArray.map(async (keyword) => {
					await getJobsByKeyword(keyword, jobs, false); // false indicates that search keyword is job keyword
				})
			);
		}

		//Check if location keyword array is not empty then process jobsearch
		if (locationsKeywordsArray.length > 0 && locationsKeywordsArray[0] !== "") {
			await Promise.all(
				locationsKeywordsArray.map(async (keyword) => {
					await getJobsByKeyword(keyword, jobs, true); // true indicates that search keyword is location keyword
				})
			);
		}

		if (locationsKeywordsArray.length === 0 && jobKeywordsArray.length === 0) {
			setAllJobs(jobs);
			return;
		}

		//Update after fetching all the jobs
		setAllJobs([...matchedJobs]);
	};
	// Function to find all job IDs by keyword (either title or location)
	const findAllJobIdsByKeyword = (keyword, jobs, isLocationSearch = false) => {
		// Filter jobs where the title or location contains the keyword
		const matchedJobs = jobs.filter((job) => {
			const searchField = isLocationSearch ? job.city : job.title;
			return searchField.toLowerCase().includes(keyword.toLowerCase());
		});

		// Return an array of jobIds for the matched jobs
		return matchedJobs.map((job) => job.job_id);
	};
	// Provide all the details about the jobs with matched job ids
	const getJobsByKeyword = async (
		jobKeyword,
		jobs,
		isLocationSearch = false
	) => {
		// Step 1: Find all job IDs matching the keyword
		const matchedJobIds = findAllJobIdsByKeyword(
			jobKeyword,
			jobs,
			isLocationSearch
		);
		if (matchedJobIds.length === 0) {
			setSearchState("error");
		} else {
			setSearchState("success");
		}
		// Step 2: Filter the entire job data to get jobs with the matched IDs
		matchedJobIds.forEach((value) => {
			// Check if the job is already in the matchedJobs array to avoid duplicates
			const matchedJob = jobs.find((job) => job.job_id === value);
			if (matchedJob && !matchedJobs.some((job) => job.job_id === value)) {
				// Only push if the job is not already in matchedJobs
				matchedJobs.push(matchedJob);
			} else {
				console.warn(`Duplicate or missing job with ID: ${value}`);
			}
		});
	};
	// Scroll to the top when the button is clicked
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	useEffect(() => {
		renderContent();
	}, [searchState]);
	const renderContent = () => {
		if (!loading && searchState === "success") {
			// When the job data is available and we have jobs with searched titles
			return <JobCards projects={allJobs} className="font-custom_Font" />;
		} else if (!loading && searchState === "") {
			// When the job data is available but user has not searched for anything
			return <JobCards projects={jobs} className="font-custom_Font" />;
		} else if (!loading && searchState === "error") {
			// When the job data is available but user searched for unknown title
			return (
				<>
					<div className="bg-white w-3/12 h-full text-center p-3  rounded-full mt-6 flex items-center justify-center ">
						<TbError404 className="text-3xl mr-5 text-red-700" />
						<h1 className="font-bold text-red-700">
							Error No Job With That Title Was Found !
						</h1>
					</div>
				</>
			);
		} else {
			// When the job data itself is not available
			return (
				<div className="bg-white w-5/12 text-center rounded-2xl font-bold mt-6 p-4 flex items-center justify-center">
					<h2 className="mr-5">Fetching the Data......</h2>
					<Spinner />
				</div>
			);
		}
	};
	const handleFilter = (filters) => {
		const { employmentType, location, salaryRange, postedDate } = filters;
		const filtered = jobs.filter((job) => {
			const matchesJobKeyword = jobKeyword
				? job.title.toLowerCase().includes(jobKeyword.toLowerCase())
				: true;
			// Employment type check
			const matchesEmploymentType = employmentType
				? job.employment_type === employmentType
				: true;
			// Location check
			const matchesLocation = location ? job.city === location : true;

			// Salary range check
			const matchesSalaryRange = salaryRange
				? job.salary >= parseInt(salaryRange.split("-")[0]) &&
					job.salary <= parseInt(salaryRange.split("-")[1])
				: true;
			// Posted date check
			const matchesPostedDate = postedDate
				? new Date(job.posted_date) >= new Date(postedDate)
				: true;
			return (
				matchesJobKeyword &&
				matchesEmploymentType &&
				matchesLocation &&
				matchesSalaryRange &&
				matchesPostedDate
			);
		});
		// Set filtered jobs
		setAllJobs(filtered);
		console.log(filtered);
		setSearchState("success");
	};

	return (
		<>
			{/* home */}
			<section className=" min-h-screen flex flex-col items-center ">
				<Navbar />

				{/* <!-- Search Bar Container --> */}
				<div className="flex items-center">
					<form onSubmit={handleJobForm} className="flex items-center">
						<div className="flex items-center bg-white shadow-lg rounded-full px-5 py-2 mt-8 w-fit">
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
									placeholder="Job title 1, Job title 2, keywords, or company"
									value={jobKeyword}
									onChange={(e) => {
										setJobKeyword(e.target.value);
									}}
									onFocus={() => setIsJobFocused(true)} // Set isFocused to true when input is focused
									onBlur={() => {
										setTimeout(() => setIsJobFocused(false), 100); // Small delay to allow the list item click
									}}
									className="focus:outline-none w-64 "
								/>

								{isJobFocused ? (
									<div className="relative">
										<ul
											className={`absolute top-5 left-[-250px] bg-custom_color1 mt-4 z-50  rounded-xl overflow-auto ${
												jobKeyword ? "h-fit" : "h-60"
											}`}
										>
											{!loading ? (
												// Dynamically filter jobTitles based on the user's input (jobKeyword)
												jobs
													.filter((job) => {
														const keywords = jobKeyword
															.split(",")
															.map((k) => k.trim());
														const lastKeyword = keywords[keywords.length - 1];

														// If the input ends with a comma, show all job titles
														if (jobKeyword.endsWith(",")) {
															return true; // Show all jobs
														}

														// Otherwise, filter based on the last keyword
														return job.title
															.toLowerCase()
															.includes(lastKeyword.toLowerCase());
													})
													.map((job) => (
														<li
															key={job.job_id}
															className="p-2 hover:bg-custom_bg hover:text-white cursor-pointer"
															onMouseDown={() => handleDropdownClick(job.title)} // Use onMouseDown to avoid onBlur issues
														>
															{job.title}
														</li>
													))
											) : (
												<li className="p-2 hover:bg-gray-200 cursor-pointer text-center text-red-600">
													No Titles matched
												</li>
											)}
										</ul>
									</div>
								) : null}
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
									onFocus={() => setIsLocationFocused(true)} // Set isFocused to true when input is focused
									onBlur={() => {
										setTimeout(() => setIsLocationFocused(false), 100); // Small delay to allow the list item click
									}}
								/>
								{isLocationFocused ? (
									<div className="relative">
										<ul
											className={`absolute top-5 left-[-250px] bg-custom_color1 mt-4 z-50 rounded-xl overflow-auto ${
												locations.length > 10 ? "h-60" : "h-fit"
											}`}
										>
											{!loading ? (
												// Dynamically filter locations based on user's input
												locations
													.filter((loc) => {
														const keywords = locationKeyword
															.split(",")
															.map((k) => k.trim());
														const lastKeyword = keywords[keywords.length - 1];

														// If the input ends with a comma, show all job titles
														if (locationKeyword.endsWith(",")) {
															return true; // Show all jobs
														}

														// Otherwise, filter based on the last keyword
														return loc
															.toLowerCase()
															.includes(lastKeyword.toLowerCase());
													})
													.map((loc, index) => (
														<li
															key={index}
															className="p-2 hover:bg-custom_bg hover:text-white cursor-pointer"
															onMouseDown={() => handleLocationClick(loc)} // Use onMouseDown to avoid onBlur issues
														>
															{loc}
														</li>
													))
											) : (
												<li className="p-2 hover:bg-gray-200 cursor-pointer text-center text-red-600">
													No Locations matched
												</li>
											)}
										</ul>
									</div>
								) : null}
							</div>

							{/* <!-- Search Button --> */}
							<Button
								className="rounded-3xl px-6 text-lg"
								onSubmit={handleJobForm}
							>
								Find jobs
							</Button>
						</div>
					</form>
					<div className="mt-8">
						<Popover>
							<PopoverTrigger>
								<h3 className="rounded-3xl px-8 py-2 text-lg ml-4 bg-custom_color1 hover:bg-white text-black font-bold">
									Filters
								</h3>
							</PopoverTrigger>
							<PopoverContent className="mt-2">
								<FiltersDropdown jobs={jobs} handleFilter={handleFilter} />
							</PopoverContent>
						</Popover>
					</div>
				</div>
				{renderContent()}
				<button
					className="flex justify-center items-center p-2 bg-white cursor-pointer fixed bottom-[20px] right-[20px] z-100 rounded-full"
					onClick={scrollToTop}
				>
					<img src={UpArrow} className="w-6" />
				</button>
			</section>
		</>
	);
};
