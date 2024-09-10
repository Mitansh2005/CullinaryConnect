import axios from "axios";
import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
export const JobData = () => {
	const [jobData, setJobData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Fetch data from your API
		axios
			.get("http://127.0.0.1:8000/api/jobs") // Replace with your API endpoint
			.then((response) => {
				setJobData(response);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
				setLoading(false);
			});
	}, []);

	return { jobData, loading };
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
	const { loading, error, data } = useQuery(GET_JOB_TITLES);
  useEffect(() => {
    if (data && data.allJobs) {
      setJobTitles(data.allJobs);  // Update job titles state
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <h1>Available Job Titles</h1>
      <JobList jobTitles={jobTitles} /> {/* Passing jobTitles to JobList component */}
    </div>
  );
};

