import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const SignUp = () => {
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [confirm, setConfirm] = useState<string>();
	const [checkSame, setCheckSame] = useState<boolean>();
	const [errorMessage, setErrorMessage] = useState<string>();
	const route = useRouter();

	const onSingup = () => {
		try {
			setErrorMessage("");
			console.log(email);
			console.log(password);

			const formData = new FormData();
			if (email && password) {
				formData.append("ID", email);
				formData.append("password", password);
			}
			axios.post(
				"https://startail12-api.cpslab.or.kr/call?type=Register",
				formData,
			);

			route.push("/login");
		} catch (error) {
			setErrorMessage("");
		}
	};

	const onSamePasswordCheck = () => {
		if (password === confirm) {
			setCheckSame(true);
		} else {
			setCheckSame(false);
		}
	};
	return (
		<>
			<Head>
				<title> Free3D - signuo </title>
				<meta name="description" content="signuo page" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<section className="h-[calc(100vh-76px)] text-gray-600 body-font">
				<div className="container flex flex-wrap items-center px-5 py-24 mx-auto">
					<div className="flex flex-col w-full p-8 mt-10 bg-gray-100 rounded-lg lg:w-2/6 md:w-1/2 md:mx-auto md:mt-0">
						<h2 className="mb-5 text-lg font-medium text-gray-900 title-font">
							Register
						</h2>
						<div className="relative mb-4">
							<label
								htmlFor="email"
								className="text-sm leading-7 text-gray-600"
							>
								Email
							</label>
							<input
								type="text"
								id="email"
								name="email"
								className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="relative mb-4">
							<label
								htmlFor="email"
								className="text-sm leading-7 text-gray-600"
							>
								password
							</label>
							<input
								type="password"
								id="password"
								name="password"
								className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="relative mb-4">
							<label
								htmlFor="email"
								className="text-sm leading-7 text-gray-600"
							>
								Confirm Password
							</label>
							<input
								type="password"
								id="password"
								name="password"
								className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
								onChange={(e) => {
									setConfirm(e.target.value);
									onSamePasswordCheck();
								}}
							/>
						</div>
						<button
							className={`px-8 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600" ${
								checkSame ? "bg-indigo-500" : "bg-indigo-200 cursor-not-allowed"
							}`}
							onClick={() => onSingup()}
							disabled={!checkSame}
						>
							Sign Up
						</button>
						<p className="flex text-rose-700 border-l-red-600">
							{errorMessage}
						</p>
						<p className="mt-3 text-xs text-lg">
							<Link href={"/login"}>login</Link>
						</p>
					</div>
				</div>
			</section>
		</>
	);
};

export default SignUp;
