import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/ui/custom/spinner";
import { ApplicationGroup } from "./ApplicationGroup";
import { getFreshIdToken, getUid } from "@/firebase/authUtils";
import { baseUrl } from "@/constants/constants";
export const Applications = () => {
	const [groupedApplications, setGroupedApplications] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchApplications = async () => {
			try {
				const token = await getFreshIdToken(true);
				const res = await axios.get(`${baseUrl}/application`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const grouped = groupByJobTitle(res.data);
				console.log(grouped);
				setGroupedApplications(grouped);
			} catch (err) {
				setError("Failed to load applications.");
			} finally {
				setLoading(false);
			}
		};

		fetchApplications();
	}, []);

	const groupByJobTitle = (applications) => {
		return applications.reduce((acc, app) => {
			const title = app.job.title;
			if (!acc[title]) acc[title] = [];
			acc[title].push(app);
			return acc;
		}, {});
	};

	if (loading) return <Spinner className={"mt-10"} />;
	if (error) return <p className="text-red-500">{error}</p>;

	return (
		<div className="min-h-screen flex justify-center items-start py-10 px-4">
			<div className="backdrop-blur-0 hover:backdrop-blur-sm bg-white/20 rounded-xl shadow-xl p-8 w-full max-w-6xl  ease-linear duration-1000">
				<h1 className="text-4xl font-bold mb-8 text-white tracking-wide">
					Job Applications
				</h1>

				{Object.entries(groupedApplications).map(([jobTitle, apps]) => (
					<ApplicationGroup
						key={jobTitle}
						title={jobTitle}
						applications={apps}
					/>
				))}
			</div>
		</div>
	);
};
