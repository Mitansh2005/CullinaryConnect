import "./App.css";
import LoginTemplate from "./components/auth/login";
import { RegisterTemplate } from "./components/auth/Register";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	BrowserRouter,
} from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import { HomeTemplate } from "./pages/Home";
import { useUser } from "./UserContext";
import { useEffect } from "react";
import { ProfileTemplate } from "./pages/Profile";
import { ProfileForm } from "./components/ui/custom/profile_component/profile-form";
import { MessageTemplate } from "./pages/Messages";
import { ProfileBio } from "./components/ui/custom/profile_component/profile_bio";
import { JobCardDesign } from "./components/ui/custom/JobCardNewDesign";
import { Applications } from "./pages/Applications";
import MainLayout from "./MainLayout";
import PostJobForm from "./pages/PostJobs";
import { CompanyProfileTemplate } from "./pages/CompanyProfile";
import { CompanyProfileForm } from "./components/ui/custom/company_profile/CompanyProfileForm";

function App() {
	const { userData, setUserData } = useUser();
	useEffect(() => {
		const savedUserData = JSON.parse(localStorage.getItem("userData"));
		if (savedUserData) {
			setUserData(savedUserData); // Load data into the context
		}
	}, [setUserData]);
	return (
		<>
			<div className="bg-dark-grid font-customFont3 text-xl min-h-screen">
				{/* <Navbar/> */}
				<AuthProvider>
					<BrowserRouter basename="/">
						<Routes>
							<Route path="/login" element={<LoginTemplate />}></Route>
							<Route path="/register" element={<RegisterTemplate />}></Route>
							<Route element={<MainLayout />}>
								<Route path="/home" element={<HomeTemplate />}></Route>
								<Route path="/post-job" element={<PostJobForm/>}></Route>
								<Route path="/applications" element={<Applications />}></Route>
								<Route path="/profile" element={<ProfileTemplate />}></Route>
								<Route path="/company-profile" element={<CompanyProfileTemplate />}></Route>
								<Route path="/edit-company-profile" element={<CompanyProfileForm/>}></Route>
								<Route path="/bio" element={<ProfileBio />}></Route>
								<Route path="/contact_form" element={<ProfileForm />}></Route>
								<Route path="/messages" element={<MessageTemplate />}></Route>
								<Route path="/dev" element={<JobCardDesign />}></Route>
							</Route>
						</Routes>
					</BrowserRouter>
				</AuthProvider>
			</div>
		</>
	);
}

export default App;
