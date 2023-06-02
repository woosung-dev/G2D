import Link from "next/link";
import { useState } from "react";

export default function Login() {
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();

	const onLogin = () => {
		try {
			//
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section className="h-[calc(100vh-76px)] text-gray-600 body-font">
			<div className="container flex flex-wrap items-center px-5 py-24 mx-auto">
				<div className="flex flex-col w-full p-8 mt-10 bg-gray-100 rounded-lg lg:w-2/6 md:w-1/2 md:mx-auto md:mt-0">
					<h2 className="mb-5 text-lg font-medium text-gray-900 title-font">
						Login
					</h2>
					<div className="relative mb-4">
						<label htmlFor="email" className="text-sm leading-7 text-gray-600">
							Email
						</label>
						<input
							type="text"
							id="email"
							name="email"
							className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
						/>
					</div>
					<div className="relative mb-4">
						<label htmlFor="email" className="text-sm leading-7 text-gray-600">
							password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
						/>
					</div>
					<button
						className="px-8 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600"
						onClick={() => onLogin()}
					>
						Login
					</button>
					<p className="mt-3 text-xs text-gray-500">
						Don’t have an account?{" "}
						<Link href={"/signup"} className="underline">
							Sign Up
						</Link>
					</p>
				</div>
			</div>
		</section>
	);
}
