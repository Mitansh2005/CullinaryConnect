import { useState } from "react";
import {
	doCreateUserWithEmailPassword,
	doSignInWithGoogle,
} from "@/firebase/auth";
import { Button } from "../ui/button";
import loginImg from "../../assets/login.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export function RegisterTemplate() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmpassword, setConfirmPassword] = useState("");
	const [checkPassword, setCheckPassword] = useState(false);
	const [isRegisterIn, setIsRegisterIn] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [passwordVisible, setPasswordVisible] = useState(false);

	const onSubmit = async (e) => {
		e.preventDefault();

		if (!isRegisterIn) {
			setIsRegisterIn(true);
			doCreateUserWithEmailPassword(email, password).finally(
				navigate("/login")
			);
		}
	};
	const onGoogleSignIn = (e) => {
		e.preventDefault();
		if (!isRegisterIn) {
			setIsRegisterIn(true);
			doSignInWithGoogle().catch((err) => {
				setIsRegisterIn(false);
			});
		}
	};
	const togglePasswordVisibility = (e) => {
		e.preventDefault();
		setPasswordVisible(!passwordVisible);
	};

	const checkFunction = () => {
		if (password == confirmpassword) {
			setCheckPassword(true);
		}
		setCheckPassword(false);
	};
	return (
		<>
			<section className="flex items-center justify-center">
				{/* login container */}
				<div className="bg-gray-200 flex rounded-2xl shadow-lg max-w-3xl px-16 py-5 mt-9">
					{/* form */}
					<div className="smw-1/2 px-20">
						<h2 className="font-black text-5xl text-[#615519]">SIGN UP</h2>
						<p className="text-sm mt-4 text-[#9a8a38]">
							To Become A Member Sign Up Here
						</p>
						<form action="" onSubmit={onSubmit} className="flex flex-col gap-4">
							<input
								className="p-2 mt-2 rounded-xl border w-full focus:outline-none focus:border-blue-300 focus:border-4 focus:bg-blue-100 ease-linear duration-150"
								type="text"
								name="email"
								placeholder="Email"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							></input>
							<div className="relative">
								<input
									className="p-2 mt-2 rounded-xl border w-full focus:outline-none focus:border-blue-300 focus:border-4 focus:bg-blue-100 ease-linear duration-150 "
									type={passwordVisible ? "text" : "password"}
									name="password"
									placeholder="Set Password"
									value={password}
									onChange={(e) => {
										setPassword(e.target.value);
									}}
								></input>

								<button onClick={togglePasswordVisibility}>
									{passwordVisible ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="grey"
											className="bi bi-eye absolute top-7 
            right-3 -translate-y-1/2 cursor-pointer"
											viewBox="0 0 16 16"
										>
											<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
											<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
										</svg>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											className="bi bi-eye-slash  absolute top-7 right-3 -translate-y-1/2 cursor-pointer"
											viewBox="0 0 16 16"
										>
											<path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
											<path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
											<path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
										</svg>
									)}
								</button>
							</div>
							<div className="relative">
								<input
									className="p-2 mt-2 rounded-xl border w-full focus:outline-none focus:border-blue-300 focus:border-4 focus:bg-blue-100 ease-linear duration-150 "
									type={passwordVisible ? "text" : "password"}
									name="password"
									placeholder="Confirm Password"
									value={confirmpassword}
									onChange={(e) => {
										setConfirmPassword(e.target.value);
									}}
								></input>

								<button onClick={togglePasswordVisibility}>
									{passwordVisible ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="grey"
											className="bi bi-eye absolute top-7 
            right-3 -translate-y-1/2 cursor-pointer"
											viewBox="0 0 16 16"
										>
											<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
											<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
										</svg>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											className="bi bi-eye-slash  absolute top-7 right-3 -translate-y-1/2 cursor-pointer"
											viewBox="0 0 16 16"
										>
											<path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
											<path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
											<path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
										</svg>
									)}
								</button>
							</div>
							<Button variant="default" onClick={onSubmit}>
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
