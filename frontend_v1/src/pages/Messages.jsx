import { Navbar } from "@/components/ui/custom/Navbar";
import company_icon from "../assets/company-icon.png";
import more_icon from "../assets/more-icon.png";
import { FaLocationArrow } from "react-icons/fa";
import { IoDocumentAttachOutline } from "react-icons/io5";
export function MessageTemplate() {
	return (
		<>
			<Navbar />
			<section className="flex h-fit pb-10">
				{/* side panel */}
				<div className="w-3/12 bg-gray-200 h-full ml-7 mt-6 rounded-lg p-5 flex  flex-col">
					<h1 className="text-2xl font-bold">Messages</h1>
					<div className="flex items-center bg-gray-300 rounded-xl p-3 mt-4 focus:bg-red-300">
						<div className="bg-blue-200 p-2 rounded-lg">
							<img src={company_icon} className="w-14"></img>
						</div>
						<div className="ml-6">
							<p className="text-md font-bold">Company Name</p>
						</div>
					</div>
				</div>
				{/* middle chat panel  */}
				<div className="bg-gray-200 ml-16 w-6/12 h-fit mt-6 rounded-lg">
					{/* header  */}
					<div className="flex justify-between border-b-2 border-gray-300 items-center p-3">
						<div className="bg-blue-200 p-1 rounded-lg">
							<img src={company_icon} className="w-10"></img>
						</div>
						<div>
							<p className="text-md font-bold">Company Name</p>
						</div>
						<div>
							<img src={more_icon} className="w-8"></img>
						</div>
					</div>
					{/* message text area  */}
					<div>
						<div className="w-full bg-white h-80">
							{/* individual message  */}
							<div className="pt-6 pl-7">
								<div className="w-72 flex flex-col">
									<div className="flex items-center">
										<div>photo</div>
										<div> 
											<p className="text-sm font-bold mb-2">Sender Name</p>
										</div>
									</div>
									<div>
										<p className="text-sm bg-gray-300 rounded-xl p-2">
											Lorem, ipsum dolor sit amet consectetur adipisicing elit.
											Vero exercitationem dolor voluptatibus earum aperiam,
											nobis mollitia adipisci sit nostrum error cumque vel
											reiciendis nam illo, labore architecto, fugit autem ut?
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="mt-6 flex flex-col mb-6 bg-white">
							<input
								type="text"
								placeholder="Enter message here"
								name="message-text"
								className="h-20 w-full p-4 focus:outline-none focus:border-b-4 focus:border-blue-400 ease-linear duration-150"
							></input>
							<div className="flex flex-row justify-between p-4">
								<div className=" hover:bg-blue-200 hover:text-blue-700 p-2 rounded-xl cursor-pointer">
									<IoDocumentAttachOutline className="text-2xl " />
								</div>
								<div className="p-3 hover:text-blue-700 cursor-pointer">
									<FaLocationArrow className="text-xl" />
								</div>
							</div>
						</div>
					</div>
					<div></div>
				</div>
			</section>
		</>
	);
}
