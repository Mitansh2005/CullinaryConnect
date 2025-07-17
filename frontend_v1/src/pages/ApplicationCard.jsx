import { ImLocation } from "react-icons/im";

export const ApplicationCard = ({ application }) => {
  const { job, applicant, application_date, status } = application;
  const user = applicant.user;

  const jobLocation = `${job.location.city}, ${job.location.state}`;
  const statusText =
    status === "p" ? "Pending" : status === "a" ? "Accepted" : "Rejected";

  return (
    <div className="bg-white shadow rounded-lg p-5 w-fit flex flex-col justify-between border border-gray-200 text-base">
      <div className="flex flex-col gap-2">
        <div className="font-semibold text-xl text-gray-800">{user.username}</div>

        <div className="text-gray-700 text-lg">
          <div className="font-medium">{user.email}</div>
          <div className="text-gray-600">{job.title} @ {job.company_name}</div>
          <div className="text-gray-600 flex items-center" ><ImLocation className="mr-1"/>{jobLocation}</div>
        </div>

        <div className="text-lg	 text-gray-500 mt-2">
          Applied on: {application_date}
        </div>

        <div className="mt-2">
          <span
            className={`text-sm px-2 py-1 rounded ${
              status === "p"
                ? "bg-yellow-100 text-yellow-800"
                : status === "a"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {statusText}
          </span>
        </div>
      </div>

      <div className="flex justify-between gap-2 mt-4">
        <button className="border border-green-700 text-green-700 hover:bg-green-700 hover:text-white text-sm px-6 py-2 rounded">
          Hire
        </button>
        <button className="border border-blue-600 text-blue-600 text-sm px-4 py-2 rounded hover:bg-blue-600 hover:text-white">
          Message
        </button>
      </div>
    </div>
  );
};
