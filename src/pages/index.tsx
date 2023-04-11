import React from "react";
import Head from "next/head";
import Hero from "@/component/home/hero";
import dogSrc from "../../public/dog-1.jpg";
import Image from "next/image";
import Layout from "@/component/layout";

export default function Home() {
	return (
		<>
			<Head>
				<title> C2D - main </title>
				<meta name="description" content="main page" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<section className="flex flex-col items-center justify-center gray-600 min-fl body-font">
				<div className="container flex flex-col items-center px-5 py-24 mx-auto md:flex-row">
					<Hero />
				</div>
			</section>
			<section className="text-gray-600 body-font">
				<div className="container px-5 py-24 mx-auto">
					<div className="flex flex-wrap -m-4">
						{TempData.map((v, index) => {
							return (
								<div key={`col-${index}`}>
									<div className="flex flex-col">
										<h2 className="py-4 font-semibold text-gray-900 title-font">
											{v.category}
										</h2>
										<hr />
										<div className="flex flex-row">
											{v.data.map((data, index) => {
												return (
													// eslint-disable-next-line react/jsx-key
													<div
														className="m-4 cursor-pointer item-card md:w-1/6"
														key={`row-${index}`}
													>
														<div className="h-full overflow-hidden border-2 border-gray-200 rounded-lg border-opacity-60">
															<Image
																src={dogSrc}
																alt="Picture of the dog"
																// placeholder="blur"
															/>
															<div className="p-4">
																<h2 className="mb-1 text-xs font-medium tracking-widest text-gray-400 title-font">
																	CATEGORY
																</h2>
																<h1 className="mb-3 text-lg font-medium text-gray-900 title-font">
																	The Dog
																</h1>
																<div className="flex flex-wrap items-center ">
																	<span className="inline-flex items-center py-1 pr-3 ml-auto text-sm leading-none text-gray-400 border-gray-200 lg:ml-auto md:ml-0">
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			fill="none"
																			viewBox="0 0 24 24"
																			strokeWidth="1.5"
																			stroke="currentColor"
																			className="w-6 h-6 mr-1"
																		>
																			<path
																				strokeLinecap="round"
																				strokeLinejoin="round"
																				d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
																			/>
																		</svg>
																		2.59
																	</span>
																</div>
															</div>
														</div>
													</div>
												);
											})}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>
		</>
	);
}

// getStaticprops is used to (category별 n가지씩 가져오도록 요청)
export const TempData = [
	{
		category: "Featured",
		data: [
			{ name: "one" },
			{ name: "two" },
			{ name: "three" },
			{ name: "four" },
			{ name: "five" },
			{ name: "six" },
		],
	},
	{
		category: "Hottest",
		data: [
			{ name: "one" },
			{ name: "two" },
			{ name: "three" },
			{ name: "four" },
			{ name: "five" },
			{ name: "six" },
		],
	},
	{
		category: "Newest",
		data: [
			{ name: "one" },
			{ name: "two" },
			{ name: "three" },
			{ name: "four" },
			{ name: "five" },
			{ name: "six" },
		],
	},
	{
		category: "Featured",
		data: [
			{ name: "one" },
			{ name: "two" },
			{ name: "three" },
			{ name: "four" },
			{ name: "five" },
			{ name: "six" },
		],
	},
	{
		category: "Most Popular Prompts This Week Explore All",
		data: [
			{ name: "one" },
			{ name: "two" },
			{ name: "three" },
			{ name: "four" },
			{ name: "five" },
			{ name: "six" },
		],
	},
	{
		category: "Most Popular Prompts This Month",
		data: [
			{ name: "one" },
			{ name: "two" },
			{ name: "three" },
			{ name: "four" },
			{ name: "five" },
			{ name: "six" },
		],
	},
];
