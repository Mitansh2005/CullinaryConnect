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
import { JobCards } from "./components/ui/custom/job-cards";
import { ProfileTemplate } from "./pages/Profile";
import { ProfileForm } from "./components/ui/custom/profile-form";
import { MessageTemplate } from "./pages/Messages";

function App() {
	return (
		<>
			<div className="bg-custom_bg font-custom text-xl ">
				<AuthProvider>
					<BrowserRouter basename="/app">
						<Routes>
							<Route path="/login" element={<LoginTemplate />}></Route>
							<Route path="/register" element={<RegisterTemplate />}></Route>
							<Route path="/home" element={<HomeTemplate />}></Route>
							<Route path="/profile" element={<ProfileTemplate />}></Route>
							<Route path="/contact_form" element={<ProfileForm />}></Route>
							<Route path="/messages" element={<MessageTemplate />}></Route>
						</Routes>
					</BrowserRouter>
				</AuthProvider>
			</div>
		</>
	);
}

export default App;
