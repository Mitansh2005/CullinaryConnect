import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
export function Navbar() {
	return (
		<>
			{/* navbar */}
			<nav className="bg-white flex items-center justify-between flex-row  h-fit min-w-full top-0 z-50 px-8 py-5">
				{/* left section  */}
				<section>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Link to="/home">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										width="24px"
										height="24px"
									>
										<g id="Rounded">
											<circle cx="12" cy="3" r="1" />
											<circle cx="22.5" cy="11.5" r="0.5" />
											<circle cx="1.5" cy="11.5" r="0.5" />
											<path d="M12.71,2.296L12,3.1l-0.71-0.804L1.203,11.098L1.5,12H4v8c0,0.552,0.448,1,1,1h4c0.552,0,1-0.448,1-1v-6h4v6c0,0.552,0.448,1,1,1h4c0.552,0,1-0.448,1-1v-8h2.5l0.297-0.902L12.71,2.296z" />
										</g>
									</svg>
								</Link>
							</TooltipTrigger>
							<TooltipContent>
								<p>Home</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</section>
				{/* right section  */}
				<section className="flex flex-row justify-between w-28 items-center">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Link to="/messages">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
										className="w-5 h-5 hover:cursor-pointer"
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
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								{" "}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 448 512"
									className="w-5 h-5 hover:cursor-pointer"
								>
									<path d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
								</svg>
							</TooltipTrigger>
							<TooltipContent>
								<p>Notifications</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Link to="/profile">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 448 512"
										className="w-5 h-5 hover:cursor-pointer"
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
				</section>
			</nav>
		</>
	);
}
