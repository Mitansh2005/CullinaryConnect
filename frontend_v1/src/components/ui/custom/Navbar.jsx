import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { COMPANY_NAME } from "@/constants/constants";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import CompanyProfile from "../../../assets/company-profile.png";

export function Navbar() {
	const userType = localStorage.getItem("userType");
	const location = useLocation();

	const isActive = (path) => location.pathname === path;

	const navItemClass = (path) =>
		`flex flex-col items-center relative ${
			isActive(path)
				? "text-[#7E1946] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-0.5 after:bg-[#7E1946]"
				: "text-gray-600"
		}`;

	return (
		<nav className="bg-white flex items-center justify-between flex-row h-20 min-w-full top-0 z-50 px-6">
			{/* left section */}
			<section>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Link to="/home">
								<div className="flex items-center ">
									<img
										src={Logo}
										alt="company-logo"
										className="w-[85px] mt-2 mr-[-10px]"
									/>
									<h1 className="text-3xl font-customFont2 font-bold">
										{COMPANY_NAME}
									</h1>
								</div>
							</Link>
						</TooltipTrigger>
						<TooltipContent>
							<p>Home</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</section>

			{/* right section */}
			<section
				className={`flex flex-row justify-between ${
					userType === "recruiter" ? "space-x-9" : "space-x-8"
				} items-center`}
			>
				{/* HOME */}
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Link to="/home" className={navItemClass("/home")}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									width="24px"
									height="24px"
								>
									<path d="M12.71,2.296L12,3.1l-0.71-0.804L1.203,11.098L1.5,12H4v8c0,0.552,0.448,1,1,1h4c0.552,0,1-0.448,1-1v-6h4v6c0,0.552,0.448,1,1,1h4c0.552,0,1-0.448,1-1v-8h2.5l0.297-0.902L12.71,2.296z" />
								</svg>
							</Link>
						</TooltipTrigger>
						<TooltipContent>
							<p>Home</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				{/* recruiter-only links */}
				{userType === "recruiter" && (
					<>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<Link
										to="/applications"
										className={navItemClass("/applications")}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 384 512"
											fill="black"
											width="20"
											height="20"
										>
											<path d="M336 64h-80c0-17.7-14.3-32-32-32H160c-17.7 0-32 14.3-32 32H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zm-144-16h64v32h-64V48zm80 352H112c-8.8 0-16-7.2-16-16s7.2-16 16-16h160c8.8 0 16 7.2 16 16s-7.2 16-16 16zm0-96H112c-8.8 0-16-7.2-16-16s7.2-16 16-16h160c8.8 0 16 7.2 16 16s-7.2 16-16 16z" />
										</svg>
									</Link>
								</TooltipTrigger>
								<TooltipContent>
									<p>Applications</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<Link
										to="/post-job"
										className={navItemClass("/post-job")}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 512 512"
											fill="black"
											width="20"
											height="20"
										>
											<path d="M176 0h160c17.7 0 32 14.3 32 32v32h80c35.3 0 64 28.7 64 64v64H0v-64C0 92.7 28.7 64 64 64h80V32c0-17.7 14.3-32 32-32zm0 96h160V32H176v64zM0 192h512v256c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192zm232 64v56h-56c-13.3 0-24 10.7-24 24s10.7 24 24 24h56v56c0 13.3 10.7 24 24 24s24-10.7 24-24V360h56c13.3 0 24-10.7 24-24s-10.7-24-24-24H280v-56c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
										</svg>
									</Link>
								</TooltipTrigger>
								<TooltipContent>
									<p>Post Job</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</>
				)}

				{/* MESSAGES */}
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Link to="/messages" className={navItemClass("/messages")}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
									className="w-5 h-5"
								>
									<path d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z" />
								</svg>
							</Link>
						</TooltipTrigger>
						<TooltipContent>
							<p>Messages</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				{/* PROFILE */}
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Link to="/profile" className={navItemClass("/profile")}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 448 512"
									className="w-5 h-5"
								>
									<path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
								</svg>
							</Link>
						</TooltipTrigger>
						<TooltipContent>
							<p>Profile</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				{/* COMPANY PROFILE */}
				{userType === "recruiter" && (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Link
									to="/company-profile"
									className={navItemClass("/company-profile")}
								>
									<img
										src={CompanyProfile}
										alt="company-profile"
										className="w-6 h-6"
									/>
								</Link>
							</TooltipTrigger>
							<TooltipContent>
								<p>Company Profile</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}
			</section>
		</nav>
	);
}
