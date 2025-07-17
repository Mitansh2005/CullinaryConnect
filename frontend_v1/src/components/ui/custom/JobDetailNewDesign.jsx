import { motion, AnimatePresence } from "framer-motion";
import { useJobDetails } from "@/services/api/jobs-data";
import DefaultLogo from "../../../assets/restaurant.png";
import { useState } from "react";
import { applyForJob } from "@/services/api/apply-for-job";
import Spinner from "./spinner";
import { getUid } from "@/firebase/authUtils";
import DOMpurify from "dompurify";
export const DetailJobCard = ({ job, onClose }) => {
	const uid = getUid();
	const userType = localStorage.getItem("userType");
	const { data, loading, error } = useJobDetails(job.job_id);
	const [jobApplicationData, setJobApplicationData] = useState({
		job: null,
		applicant_uid: null,
		application_date: "",
	});
	const [isApplicationSuccessful, setIsApplicationSuccessful] = useState(false);
	const [isApplicationLoading, setIsApplicationLoading] = useState(false);
	const [applicationError, setApplicationError] = useState("");
	let daysRemaining = 0;
	if (data) {
		const deadline = new Date(data.application_deadline);
		const now = new Date();
		const timeDiff = deadline - now;
		daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
	}

	const handleApplySubmit = async (jobId) => {
		const application = {
			job: jobId, // ID from the selected job
			applicant_uid: uid, // from localStorage
			application_date: new Date().toISOString().split("T")[0], // → "2025-06-22"
		};
		setIsApplicationLoading(true);
		setApplicationError("");
		setIsApplicationSuccessful(false);

		try {
			const res = await applyForJob(application);
			setJobApplicationData(application);
			setIsApplicationSuccessful(true);
			console.log(res);
		} catch (err) {
			console.error("Something went wrong:", err);
			setApplicationError("Application failed.");
		} finally {
			setIsApplicationLoading(false);
		}
	};
	const sanitizedHtml = (html) => {
		return DOMpurify.sanitize(html, {
			ALLOWED_TAGS: ["b", "i", "em", "strong", "a", "p", "br", "ul", "ol", "li"],
			ALLOWED_ATTR: ["href"],
		});
	};
	const isTallContent = (data) => {
  // crude example: if description or requirements are long
  return (
    (data?.description?.length ?? 0) > 600 ||
    (data?.requirements?.length ?? 0) > 600 ||
    (data?.company_description?.length ?? 0) > 600
  );
};


	return (
		<AnimatePresence>
			<motion.div
				className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center overflow-auto "
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<motion.div
					layoutId={`job-${job.job_id}`}
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.95 }}
					transition={{ duration: 0.2 }}
					className="bg-white rounded-xl shadow-xl p-8 w-[90%] h-fit max-w-4xl relative overflow-auto"
					style={{
						maxHeight: "calc(100vh - 4rem)",
						overflowY: data && isTallContent(data) ? "auto" : "visible",
					}}
				>
					<button
						type="button"
						onClick={onClose}
						className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
					>
						✕
					</button>
					{data ? (
						<div className="flex flex-col">
							<div className="flex items-center">
								<img
									loading="lazy"
									src={`data:image/jpeg;base64,${job.company_logo?.replace(/\s/g, "")}`}
									onError={(e) => {
										e.target.onerror = null;
										e.target.src = DefaultLogo;
									}}
									alt="Company Logo"
									className="h-14 w-14 object-cover  rounded-full"
								/>
								<h1 className="ml-4 text-3xl font-semibold">
									{data.company_name}
								</h1>
							</div>
							<h1 className="text-2xl font-semibold mt-4">{data.title}</h1>
							<p className="my-4 text-gray-600">
								<span dangerouslySetInnerHTML={{ __html: sanitizedHtml(data.description) }} />
							</p>
							<p className="my-4 font-semibold">{sanitizedHtml(data.requirements)}</p>
							<div>
								<span className="font-semibold text-gray-700">Location : </span>
								<span className="font-semibold text-brandBackground	">
									{data.location.city}, {data.location.state},{" "}
									{data.location.country}, {data.location.postal_code}
								</span>
							</div>
							<div>
								<span className="font-semibold text-gray-700">Salary : </span>
								<span className="text-green-700">
									{new Intl.NumberFormat("en-IN", {
										style: "currency",
										currency: "INR",
										maximumFractionDigits: 0,
									}).format(data.salary)}
									/ year
								</span>
							</div>
							<div className="flex justify-between">
								<div>
									<span className="font-semibold text-gray-700">
										Application deadline :{" "}
									</span>
									<span className="font-semibold text-red-700">
										{data.application_deadline} ({daysRemaining} days left);
									</span>
								</div>
								{userType !== "recruiter" && (
									<button
										onClick={() => handleApplySubmit(job.job_id)}
										className="bg-brandBackground hover:bg-brandBackground/90  text-white w-40 p-2 rounded-md relative -inset-2"
									>
										{isApplicationLoading ? "Applying..." : "Apply Now"}
									</button>
								)}
							</div>
							<h2 className="font-semibold text-2xl">
								More Info about the company
							</h2>
							<p className=" text-gray-600" dangerouslySetInnerHTML={{ __html: sanitizedHtml(data.company_description) }}></p>
						</div>
					) : (
						<>
							<div className="flex items-center justify-center h-64 bg-[#FBFEF9] ml-30">
								<Spinner />
								<p className="ml-4 font-semibold text-2xl text-[#0C6291]">
									Loading the job details in a second...
								</p>
							</div>
						</>
					)}
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};
