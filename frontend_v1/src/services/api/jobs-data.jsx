import axios from "axios";
import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
export const JobData = () => {
	const [jobData, setJobData] = useState([]);
	const [loading1, setLoading1] = useState(true);

	useEffect(() => {
		// Fetch data from your API
		setTimeout(() => {
			axios
				.get("http://127.0.0.1:8000/api/jobs") // Replace with your API endpoint
				.then((response) => {
					setJobData(response);
					setLoading1(false);
				})
				.catch((error) => {
					console.error("Error fetching data:", error);
					setLoading1(false);
				});
		},2000);
	}, []);
	const result = jobData.data;

	return { result, loading1 };
};
const GET_JOB_TITLES = gql`
	query GetJobTitles {
		allJobs {
			jobId
			title
		}
	}
`;
export const JobTitle = () => {
	const [jobTitles, setJobTitles] = useState([]);
	const { loading2, error, data } = useQuery(GET_JOB_TITLES);
	useEffect(() => {
		if (data && data.allJobs) {
			const extractedTitles = data.allJobs.map((item) => ({
				jobId: item.jobId, // Assuming 'id' is the field for jobId
				title: item.title,
			}));
			setJobTitles(extractedTitles);
		}
	}, [data]);

	if (loading2) return { loading2 };
	if (error) return { error };
	return { jobTitles };
};
