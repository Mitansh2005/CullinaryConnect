import { useState, useEffect } from "react";
import {
	doCreateUserWithEmailPassword,
	doSignInWithGoogle,
} from "@/firebase/auth";
import { Button } from "../ui/button";
import loginImg from "../../assets/login.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import {
	InputComponent,
	PasswordInputComponent,
} from "../ui/custom/input-component";
import { getUid, setUpProfile } from "@/firebase/authUtils";
import { auth } from "@/firebase/firebase";
export function RegisterTemplate() {
	const navigate = useNavigate();
	const [profileSetUpComplete, setProfileSetUpComplete] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmpassword, setConfirmPassword] = useState("");
	const [isRegisterIn, setIsRegisterIn] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [userType, setUserType] = useState("jobseeker"); // default is jobseeker
	const [companyName, setCompanyName] = useState("");
	const [fssaiNo, setFssaiNo] = useState("");
	const { userLoggedIn } = useAuth();

	useEffect(() => {
		if (userLoggedIn && profileSetUpComplete) {
			navigate("/home");
		}
	}, [userLoggedIn, profileSetUpComplete, navigate]);


	const onSubmit = async (e) => {
		e.preventDefault();
		if (!isRegisterIn && checkFunction()) {
			setIsRegisterIn(true);
			try {
				await doCreateUserWithEmailPassword(email, password);
				const uid = getUid();
				console.log("data sent: "+ uid + " "+ userType+" "+companyName+" "+fssaiNo);
				await setUpProfile({
					uid: uid,
					username: "New User",
					user_type: userType,
					company_name: companyName || "",
					fssai_license_no: fssaiNo || "",
				});

				setProfileSetUpComplete(true);
				console.log("Token verified and user logged in");
			} catch (err) {
				// Rollback Firebase user if profile setup fails
				const currentUser = auth.currentUser;
				if (currentUser) {
					await currentUser.delete(); // This removes user from Firebase
				}
				console.error(err);
				setErrorMessage("Something went wrong. Please Try Again");
			} finally {
				setIsRegisterIn(false);
			}
		}
	};

	const onGoogleSignIn = async (e) => {
		e.preventDefault();
		if (!isRegisterIn) {
			setIsRegisterIn(true);
			try {
				await doSignInWithGoogle();
				const uid = getUid();
				console.log(userType);
				await setUpProfile({
					uid: uid,
					username: "New User",
					user_type: userType,
					company_name: companyName || "",
					fssai_license_no: fssaiNo || "",
				});
				console.log("Token verified and user logged in");
			} catch (err) {
				setErrorMessage("Something went wrong. Please Try Again");
			} finally {
				setIsRegisterIn(false);
			}
		}
	};

	const togglePasswordVisibility = (e) => {
		e.preventDefault();
		setPasswordVisible(!passwordVisible);
	};

	const checkFunction = (e) => {
		if (password == confirmpassword) {
			return true;
		}
		setErrorMessage("Both fields should be same");
		return false;
	};
	return (
		<>
			<section className="flex items-center justify-center">
				{/* login container */}
				<div className="bg-gray-200 flex rounded-2xl shadow-lg max-w-3xl px-16 py-5 mt-9 items-center">
					{/* form */}
					<div className=" px-20">
						<h2 className="font-black text-5xl text-[#615519]">SIGN UP</h2>
						<p className="text-sm mt-4 text-[#9a8a38]">
							To Become A Member Sign Up Here
						</p>
						<div className="flex gap-4 my-4">
							<Button
								variant={userType === "jobseeker" ? "default" : "outline"}
								onClick={() => setUserType("jobseeker")}
							>
								I am a Jobseeker
							</Button>
							<Button
								variant={userType === "recruiter" ? "default" : "outline"}
								onClick={() => setUserType("recruiter")}
							>
								I am a Recruiter
							</Button>
						</div>

						<form
							action=""
							onSubmit={onSubmit}
							className="flex flex-col gap-4 w-full"
						>
							{errorMessage && (
								<div className="bg-red-300 px-3 py-2 w-fit mb-[-8px] ml-3 rounded-md text-red-700 mt-4">
									{errorMessage}
								</div>
							)}
							<InputComponent
								type="text"
								name="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								isRequired={true}
							></InputComponent>
							<PasswordInputComponent
								name="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								btnOnClick={togglePasswordVisibility}
								passwordVisiblity={passwordVisible}
							></PasswordInputComponent>
							<PasswordInputComponent
								name="confirmPassword"
								placeholder="Confirm Password"
								value={confirmpassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								btnOnClick={togglePasswordVisibility}
								passwordVisiblity={passwordVisible}
							></PasswordInputComponent>

							{/* Recruiter-only fields */}
							{userType === "recruiter" && (
								<>
									<InputComponent
										type="text"
										name="company"
										placeholder="Company Name"
										value={companyName}
										onChange={(e) => setCompanyName(e.target.value)}
										isRequired={true}
									/>
									<InputComponent
										type="text"
										name="fssai_license_no"
										placeholder="FSSAI License No"
										value={fssaiNo}
										onChange={(e) => setFssaiNo(e.target.value)}
										isRequired={true}
									/>
								</>
							)}

							<Button variant="default" type="submit" onClick={onSubmit}>
								Sign Up
							</Button>
							<button className=" w-fit text-sm italic text-blue-500 hover:text-base hover:text-blue-700 decoration-sky-500 duration-75 ease-linear">
								Forgot Password
							</button>
						</form>
						<div className="mt-4 grid grid-cols-3 items-center text-grey-100">
							<hr className="border-gray-500"></hr>
							<p className="text-center text-sm">Or</p>
							<hr className="border-gray-500"></hr>
						</div>
						{/* google sign in options  */}
						<button
							className="bg-white w-full py-2 rounded-xl mt-5 flex justify-center text-sm hover:shadow-xl ease-linear duration-200"
							onClick={onGoogleSignIn}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="mr-3"
								viewBox="0 0 48 48"
								width="25px"
								height="25px"
							>
								<path
									fill="#FFC107"
									d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
								/>
								<path
									fill="#FF3D00"
									d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
								/>
								<path
									fill="#4CAF50"
									d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
								/>
								<path
									fill="#1976D2"
									d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
								/>
							</svg>
							<p className="text-center mt-px">Login with Google</p>
						</button>
						<div className="flex mt-4 justify-between ">
							<p className="text-sm mr-2"> Have A Account? Click Here</p>
							<Link to="/login">
								<Button>SignIn</Button>
							</Link>
						</div>
					</div>

					{/* image */}
					<div className="sm:block hidden w-1/2 ml-7">
						<img
							className="rounded-2xl h-auto"
							src={loginImg}
							alt="login-img"
						></img>
					</div>
				</div>
			</section>
		</>
	);
}
