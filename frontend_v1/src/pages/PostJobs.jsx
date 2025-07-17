import { useEffect, useState } from "react";
import { InputComponent } from "@/components/ui/custom/input-component";
import { getFreshIdToken } from "@/firebase/authUtils";
import axios from "axios";
import { baseUrl } from "@/constants/constants";
import { getNames } from "country-list";
import ReactQuill from "react-quill";
export default function PostJobForm() {
	const [jobCreateStatus, setJobCreateStatus] = useState("");
	const [selectedCountry, setSelectedCountry] = useState("");
	const [recruiters, setRecruiters] = useState([]);
	const [formData, setFormData] = useState({
		assignee: "",
		company: "",
		title: "",
		description: "",
		location: {
			country: "",
			state: "",
			city: "",
			postal_code: "",
		},
		salary: "",
		employment_type: "Full Time",
		posted_date: "",
		application_deadline: "",
		requirements: "",
	});
	useEffect(() => {
		getRecruiters();
	}, []);

	const handleCountryChange = (e) => {
		const countryName = e.target.value;
		setSelectedCountry(countryName);

		setFormData({
			...formData,
			location: {
				...formData.location,
				country: countryName, // Use code if available, else fallback to name
			},
		});
	};

	const getRecruiters = async () => {
		try {
			const token = await getFreshIdToken(true);
			const res = await axios.get(`${baseUrl}/recruiters/company`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(res.data);
			formData.company = res.data[0].company;
			setRecruiters(res.data);
			console.log("Recruiters are fetched from the db.");
		} catch (error) {
			console.error("Something went wrong: ", error);
		}
	};
	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name.startsWith("location.")) {
			const field = name.split(".")[1];
			setFormData((prev) => ({
				...prev,
				location: {
					...prev.location,
					[field]: value,
				},
			}));
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const token = await getFreshIdToken(true);
			const res = await axios.post(`${baseUrl}/jobs`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "Application/json",
				},
			});
			console.log(res.data);
			setJobCreateStatus("created");
		} catch (err) {
			console.error("Something went wrong: ", err);
		}
		console.log("Job Post Submitted:", formData);
	};

	return (
		<div className="max-w-4xl mx-auto mt-12 p-8 bg-white text-black rounded-xl shadow-lg">
			<h2 className="text-3xl font-semibold mb-6">Create a Job Posting</h2>

			<form onSubmit={handleSubmit} className="space-y-5">
				<InputComponent
					label="Job Title"
					type="text"
					placeholder="e.g. Sous Chef"
					name="title"
					value={formData.title}
					onChange={handleChange}
					isRequired={true}
				/>

				<label className="block font-medium text-gray-700">
					Job Description
				</label>
				<ReactQuill
					value={formData.description}
					onChange={(value) => setFormData({ ...formData, description: value })}
					placeholder="Write a brief description about the job...."
					className="border-2 p-2 m-2 rounded-lg focus:outline-none focus:border-blue-400 focus:bg-blue-100 ease-linear duration-150"
					required
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
					<InputComponent
						label="Salary (in ₹)"
						type="number"
						placeholder="e.g. 40000"
						name="salary"
						value={formData.salary}
						onChange={handleChange}
						isRequired={true}
					/>

					<label htmlFor="employment_type" className="whitespace-nowrap">
						Employment Type
					</label>
					<select
						id="employment_type"
						name="employment_type"
						value={formData.employment_type}
						onChange={handleChange}
						className="border-2 p-2 rounded-lg m-2 focus:outline-none focus:border-blue-400 focus:bg-blue-100 ease-linear duration-150 w-full"
					>
						<option value="Full Time">Full Time</option>
						<option value="Part Time">Part Time</option>
					</select>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<InputComponent
						label="Posted Date"
						type="date"
						name="posted_date"
						value={formData.posted_date}
						onChange={handleChange}
						isRequired={true}
						labelClassname="mt-3"
					/>

					<InputComponent
						label="Application Deadline"
						type="date"
						name="application_deadline"
						value={formData.application_deadline}
						onChange={handleChange}
						isRequired={true}
						labelClassname="mt-3"
					/>
					<label htmlFor="country" className="mt-3">
						Country
					</label>
					<select
						id="country"
						name="location.country"
						value={selectedCountry}
						onChange={handleCountryChange}
						className="border-2 p-2 m-2 rounded-lg focus:outline-none focus:border-blue-400 focus:bg-blue-100 ease-linear duration-150 appearance-auto"
						>
						<option value="" disabled>
							Select a country
						</option>
						{getNames().map((country, index) => (
							<option key={index} value={country}>
								{country}
							</option>
						))}
					</select>
						</div>
				<div>
					<InputComponent
						label="State"
						type="text"
						placeholder="Enter the  state here"
						name="location.state"
						value={formData.location.state}
						onChange={handleChange}
					></InputComponent>
				</div>
				<div>
					<InputComponent
						label="City"
						type="text"
						placeholder="Enter the city  here"
						name="location.city"
						value={formData.location.city}
						onChange={handleChange}
					></InputComponent>
				</div>
				<div>
					<InputComponent
						label="Pincode"
						type="text"
						placeholder="Enter the pincode here"
						name="location.postal_code"
						value={formData.location.postal_code}
						onChange={handleChange}
					></InputComponent>
				</div>

				<label className="block font-medium text-gray-700">Requirements</label>
				<ReactQuill
					value={formData.requirements}
					onChange={(value) =>
						setFormData({ ...formData, requirements: value })
					}
					placeholder="e.g. 3+ years experience, degree in Culinary Arts..."
					className="border-2 p-2 m-2 rounded-lg focus:outline-none focus:border-blue-400 focus:bg-blue-100 ease-linear duration-150"
					required
				/>
				<div>
					<label className="block font-medium mb-1">Assign Recruiter:</label>
					<select
						name="assignee"
						value={formData.assignee}
						onChange={handleChange}
						className="w-full border-2 rounded-lg p-2 focus:outline-none focus:border-blue-400 focus:bg-blue-100"
					>
						<option value="">Select a recruiter</option>
						{recruiters.length > 0 &&
							recruiters.map((recruiter) => (
								<option
									key={recruiter.recruiter_id}
									value={recruiter.recruiter_id}
								>
									{recruiter.username}
								</option>
							))}
					</select>
				</div>
				<button
					type="submit"
					className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
				>
					Post Job
				</button>
			</form>
		</div>
	);
}
