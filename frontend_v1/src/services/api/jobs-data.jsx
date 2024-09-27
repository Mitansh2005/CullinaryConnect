import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
const GET_JOB = gql`
	query GetJob {
		allJobs {
			jobId
			title
			description
			location {
				country
				state
				city
				postalCode
			}
			salary
			employmentType
			postedDate
			applicationDeadline
			requirements
		}
	}
`;
export const Jobs = () => {
	const [jobs, setJobs] = useState([]);
	const { loading, error, data } = useQuery(GET_JOB);
	useEffect(() => {
		if (data && data.allJobs) {
			const extractedData = data.allJobs.map((item) => ({
				job_id: item.jobId, // Assuming 'id' is the field for jobId
				title: item.title,
				description: item.description,
				country: item.location?.country, // Accessing country from the location object
				state: item.location?.state, // Accessing state from the location object
				city: item.location?.city, // Accessing city from the location object
				postal_code: item.location?.postalCode, // Accessing postal code from the location object
				salary: item.salary,
				employment_type: item.employmentType,
				posted_date: item.postedDate,
				application_deadline: item.applicationDeadline,
				requirements: item.requirements,
			}));
			setJobs(extractedData);
		}
	}, [data]);
	if (loading) return { loading };
	if (error) return { error };
	return { jobs };
};
