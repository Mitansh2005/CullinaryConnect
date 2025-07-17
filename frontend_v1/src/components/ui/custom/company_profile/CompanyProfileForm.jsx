import React, { useState, useEffect } from "react";
import { InputComponent } from "../input-component";
import { NormalButtons } from "../../ui_buttons";
import { Link, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { getNames } from "country-list";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getFreshIdToken } from "@/firebase/authUtils";
import axios from "axios";
import { baseUrl } from "@/constants/constants";

export const CompanyProfileForm = () => {
	const location = useLocation();
	console.log(location.state.companyData);
	const companyId = location.state?.companyData?.id || "";
	const [form, setForm] = useState({
		name: "",
		location: {
			country: "",
			state: "",
			city: "",
			postal_code: "",
		},
		size: "",
		description: "",
	});

	const [selectedCountry, setSelectedCountry] = useState("");
	const companySizeChoices = {
		small: "1-50 employees",
		medium: "51-250 employees",
		large: "251-1000 employees",
		enterprise: "1000+ employees",
	};
	// Initialize companyData from location.state
	useEffect(() => {
		if (location.state?.companyData) {
			setForm({
				name: location.state.companyData.name || "",
				location: {
					country: location.state.companyData.location?.country || "",
					state: location.state.companyData.location?.state || "",
					city: location.state.companyData.location?.city || "",
					postal_code: location.state.companyData.location?.postal_code || "",
				},
				size: location.state.companyData.size || "",
				description: location.state.companyData.description || "",
			});
			setSelectedCountry(location.state.companyData.location?.country || "");
		} else {
			console.warn("No companyData passed — optionally fetch from API here.");
		}
	}, [location.state]);

	const handleCountryChange = (e) => {
		const countryName = e.target.value;
		setSelectedCountry(countryName);

		setForm((prev) => ({
			...prev,
			location: {
				...prev.location,
				country: countryName,
			},
		}));
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name.startsWith("location.")) {
			const field = name.split(".")[1];
			setForm((prev) => ({
				...prev,
				location: {
					...prev.location,
					[field]: value,
				},
			}));
		} else {
			setForm((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const token = await getFreshIdToken(true);
			const res = await axios.patch(`${baseUrl}/company/${companyId}`, form, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			console.log("Submitting form:", form);
		} catch (err) {
			console.error("Error submitting form:", err);
		}
	};

	return (
		<div className="flex justify-center">
			<Card className="w-7/12 mt-8">
				<CardHeader>
					<Link to="/company-profile">
						<FaArrowLeft className="mb-3 text-lg hover:cursor-pointer hover:text-red-600 " />
					</Link>
					<CardTitle>Edit Company Profile</CardTitle>
					<CardDescription>
						Please fill out your company details below. This information will be
						visible to candidates.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
						<InputComponent
							label="Company Name"
							type="text"
							placeholder="Enter company name"
							name="name"
							value={form.name}
							onChange={handleChange}
							isRequired={true}
						/>
						<label htmlFor="country">Country</label>
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
						<InputComponent
							label="State"
							type="text"
							placeholder="Enter the state here"
							name="location.state"
							value={form.location.state}
							onChange={handleChange}
						/>
						<InputComponent
							label="City"
							type="text"
							placeholder="Enter the city here"
							name="location.city"
							value={form.location.city}
							onChange={handleChange}
						/>
						<InputComponent
							label="Pincode"
							type="text"
							placeholder="Enter the pincode here"
							name="location.postal_code"
							value={form.location.postal_code}
							onChange={handleChange}
						/>
						<label className="block text-gray-700 text-lg font-semibold mb-2">
							Company Size
						</label>
						<select
							name="size"
							value={form.size}
							onChange={handleChange}
							className="border-2 p-2 m-2 rounded-lg focus:outline-none focus:border-blue-400 focus:bg-blue-100 ease-linear duration-150 appearance-auto"
						>
							<option value="" disabled>
								Select company size
							</option>
							{Object.entries(companySizeChoices).map(([key, label]) => (
								<option key={key} value={key}>
									{label}
								</option>
							))}
						</select>
						<div>
							<label className="block text-gray-700 text-lg font-semibold mb-2">
								Description
							</label>
							<ReactQuill
								value={form.description}
								onChange={(value) =>
									setForm((prev) => ({ ...prev, description: value }))
								}
								placeholder="Write a brief description about your company"
								className="border-2 p-2 m-2 rounded-lg focus:outline-none focus:border-blue-400 focus:bg-blue-100 ease-linear duration-150"
								required
							/>
						</div>
						<div className="flex justify-center items-center mt-4">
							<NormalButtons />
						</div>
					</form>
				</CardContent>
				<CardFooter>
					<p className="text-red-600 font-semibold">
						Please fill this form correctly for better experience.
					</p>
				</CardFooter>
			</Card>
		</div>
	);
};
