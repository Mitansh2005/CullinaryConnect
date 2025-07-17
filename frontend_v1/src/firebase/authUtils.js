import axios from "axios";
import { auth } from "./firebase";
export const getFreshIdToken = async () => {
	const user = auth.currentUser;
	if (!user) throw new Error("User not authenticated");
	console.log(user.getIdToken(true));
	return await user.getIdToken(true); // true = force refresh
};

export const getUid = () => {
	return auth.currentUser?.uid;
};


export const setUpProfile = async ({
	uid,
	username,
	user_type,
	company_name,
	fssai_license_no,
}) => {
	console.log("Api call working ")
	const baseUrl = "http://127.0.0.1:8000/api";
	console.log("Data being transferred:"+	uid,
				username,
				user_type,
				company_name,
				fssai_license_no,);
	try {
		const token = await getFreshIdToken(true);
		const response = await axios.post(
			`${baseUrl}/auth/setup-profile`,
			{
				uid,
				username,
				user_type,
				company_name,
				fssai_license_no,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		console.log("Profile setup successful:", response.data);
		localStorage.setItem("userType",user_type);
		return response.data;
	} catch (error) {
		console.error(
			"Profile setup failed:",
			error.response?.data || error.message
		);
		throw error;
	}
};
