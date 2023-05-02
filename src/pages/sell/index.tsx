import React, { useState } from "react";
import Image from "next/image";
import catT from "../../../public/cat-1.jpg";

interface IProps {
	sell?: any;
}
function Sell({ sell }: IProps) {
	const [step, setStep] = useState<number>(1);

	return (
		<div className="w-full px-8">
			{/* step */}
			<div className="flex mt-12">
				<div className="flex justify-center w-full mx-auto">
					<ol className="flex items-center w-full">
						<li className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
							<span className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
								<svg
									aria-hidden="true"
									className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									></path>
								</svg>
							</span>
						</li>
						<li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
							<span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
								<svg
									aria-hidden="true"
									className="w-5 h-5 text-gray-500 lg:w-6 lg:h-6 dark:text-gray-100"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
										clipRule="evenodd"
									></path>
								</svg>
							</span>
						</li>
						<li className="flex items-center">
							<span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
								<svg
									aria-hidden="true"
									className="w-5 h-5 text-gray-500 lg:w-6 lg:h-6 dark:text-gray-100"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
									<path
										fillRule="evenodd"
										d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clipRule="evenodd"
									></path>
								</svg>
							</span>
						</li>
					</ol>
				</div>
			</div>

			{/* content */}
			<section className="flex mx-12">
				{step === 1 && (
					<div>
						<div className="flex justify-around gap-8 my-16">
							<div>
								<h2>Start selling your 3D Model</h2>
								<p className="flex-wrap flex-auto break-keep">
									G2D is a marketplace for DALL·E, Midjourney, Stable Diffusion
									and GPT Prompts. You can sell your own prompts on G2D and
									start earning from your Prompt Engineering skills. If your
									prompt is approved, you&gt;ll keep 80% of revenue from every
									sale of your prompt. Get selling in just 2 minutes.
								</p>
							</div>
							<div className="flex-auto">
								<Image src={catT} alt={""} width={1000} />
							</div>
						</div>
						<div className="flex items-center justify-center my-10">
							<button className="btn-project"> Sell 3D Model</button>
						</div>
					</div>
				)}
				{step === 2 && <></>}
				{step === 3 && <></>}
			</section>
		</div>
	);
}

export default Sell;
