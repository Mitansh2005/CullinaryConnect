import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "../button";
import { Navbar } from "./Navbar";
import { InputComponent } from "./input-component";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
export function ProfileForm() {
	return (
		<>
			<Navbar />
			<div className="flex justify-center">
				<Card className="w-6/12 mt-8">
					<CardHeader>
						<Link to="/profile">
							<FaArrowLeft className="mb-3 text-lg hover:cursor-pointer hover:text-red-600 " />
						</Link>
						<CardTitle>Contact Information</CardTitle>
						<CardDescription>
							{" "}
							Please fill out the form below with your contact details and
							message. Our team will get back to you as soon as possible. We
							value your privacy and ensure your information is kept secure.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form className="flex flex-col">
							<InputComponent
								label="First name"
								type="text"
								placeholder="Enter your first name"
								name="first-name"
							></InputComponent>
							<InputComponent
								label="Last name"
								type="text"
								placeholder="Enter your last name"
								name="last-name"
							></InputComponent>
							<InputComponent
								label="Headline"
								type="text"
								placeholder="Enter a headline"
								name="headline"
							></InputComponent>
							<InputComponent
								label="Phone"
								type="text"
								placeholder="Enter your phone number"
								name="phone-number"
							></InputComponent>
							<div className="flex flex-row items-center mt-4">
								<label>
									<input type="checkbox" name="consent-box"></input> By checking
									you allow number to be visible to employer in the web
								</label>
							</div>
						</form>
						<h1 className="font-bold text-xl mt-6">Email</h1>
						<div className="flex p-4 items-center justify-between">
							<div>
								<p>mitanshpithadia76@gmail.com</p>
							</div>
							<div className="flex items-center justify-between w-12 text-blue-500 hover:cursor-pointer">
								<p>Edit</p>
								<FaArrowRight />
							</div>
						</div>
						<hr className="border-gray-500"></hr>
						<h1 className="text-xl font-bold mt-6">Location</h1>
						<p className="text-sm text-gray-500">
							This helps match you with nearby jobs.
						</p>
						<form className="flex flex-col mt-3">
							<InputComponent
								label="Country"
								type="text"
								placeholder="Enter the Country here"
								name="country"
							></InputComponent>
							<InputComponent
								label="Street address"
								type="text"
								placeholder="Enter the address here"
								name="street-address"
							></InputComponent>
							<InputComponent
								label="City,State"
								type="text"
								placeholder="Enter the city and state here"
								name="city-state-address"
							></InputComponent>
							<InputComponent
								label="Area"
								type="text"
								placeholder="Enter the aread details  here"
								name="area-address"
							></InputComponent>
							<InputComponent
								label="Pincode"
								type="text"
								placeholder="Enter the pincode here"
								name="pincode"
							></InputComponent>
							<label>Relocation</label>
							<div className="m-2">
								<input type="checkbox"></input>
								<label className="ml-2">Yes I am willing to relocate</label>
							</div>
						</form>
					</CardContent>

					<CardFooter>
						<Button>Save</Button>
					</CardFooter>
				</Card>
			</div>
		</>
	);
}
