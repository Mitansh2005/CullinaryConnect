import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import loginImg from "../../assets/login.png";
import {
	doSignInWithGoogle,
	doSignInWithEmailPassword,
	doPasswordChange,
} from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";
import { Link, useNavigate } from "react-router-dom";
import {
	InputComponent,
	PasswordInputComponent,
} from "../ui/custom/input-component";
import { auth } from "@/firebase/firebase";
import { getUid, setUpProfile } from "@/firebase/authUtils";

function LoginTemplate() {
	const navigate = useNavigate();
	const { userLoggedIn } = useAuth();

	useEffect(() => {
		if (userLoggedIn) {
			navigate("/home");
		}
	}, [userLoggedIn, navigate]);
	const [userType, setUserType] = useState("jobseeker"); // default is jobseeker
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSigningIn, setIsSigningIn] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [passwordVisible, setPasswordVisible] = useState(false);

	const onSubmit = async (e) => {
		e.preventDefault();
		if (!isSigningIn) {
			setIsSigningIn(true);
			try {
				await doSignInWithEmailPassword(email, password);
				console.log("Token verified and user logged in");
			} catch (err) {
				setErrorMessage("Something went wrong. Please Try Again");
			} finally {
				setIsSigningIn(false);
			}
		}
	};

	const onGoogleSignIn = async (e) => {
		e.preventDefault();
		if (!isSigningIn) {
			setIsSigningIn(true);
			try {
				console.log(userType);
				await doSignInWithGoogle();
				const uid = getUid();
				const res = await setUpProfile({
					uid: uid,
					username: "New user",
					user_type: userType,
				});
				console.log("Token verified and user logged in", res);
			} catch (err) {
				setErrorMessage("Something went wrong. Please Try Again");
			} finally {
				setIsSigningIn(false);
			}
		}
	};

	const togglePasswordVisibility = (e) => {
		e.preventDefault();
		setPasswordVisible(!passwordVisible);
	};
	return (
		<>
			<section className="flex items-center justify-center">
				{/* login container */}
				<div className="bg-gray-200 flex rounded-xl shadow-lg max-w-3xl px-16 py-5 m-9">
					{/* form */}
					<div className="smw-1/2 px-10">
						<h2 className="font-black text-4xl mt-4 text-[#615519]">SIGN IN</h2>
						<p className="text-lg mt-2 text-[#9a8a38]">
							If you already a member sign in easily
						</p>
						{errorMessage && (
							<p className="text-red-600 text-lg bg-red-200 px-2 py-1 rounded-md mt-1">
								{errorMessage}
							</p>
						)}
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

						<form action="" onSubmit={onSubmit} className="flex flex-col gap-4">
							<InputComponent
								type="text"
								name="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></InputComponent>
							<PasswordInputComponent
								name="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								btnOnClick={togglePasswordVisibility}
								passwordVisiblity={passwordVisible}
							></PasswordInputComponent>
							<Button variant="default" onClick={onSubmit}>
								SignIn
							</Button>
							<button className=" w-fit text-sm italic text-blue-500 hover:underline decoration-sky-500">
								Forgot Password
							</button>
						</form>
						<div className="mt-2 grid grid-cols-3 items-center text-grey-100">
							<hr className="border-gray-500"></hr>
							<p className="text-center text-sm">Or</p>
							<hr className="border-gray-500"></hr>
						</div>
						{/* google sign in options  */}
						<button
							className="bg-white w-full py-2 rounded-xl mt-3 flex justify-center hover:shadow-xl ease-linear duration-200"
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
							<p className="text-base font-sans text-center   text-gray-500">
								Login with Google
							</p>
						</button>
						<div className="flex mt-10 justify-between ">
							<p className="text-base mr-2">Don't Have A Account? Click Here</p>
							<Link to="/register">
								<Button>SignUp</Button>
							</Link>
						</div>
					</div>

					{/* image */}
					<div className="sm:block hidden w-1/2 mt-7 ml-7">
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
export default LoginTemplate;
