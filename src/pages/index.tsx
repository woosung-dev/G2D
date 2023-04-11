import React from "react";
import Head from "next/head";
import Hero from "@/component/home/hero";
import dogSrc from "../../public/dog-1.jpg";
import Image from "next/image";

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
													<div className="p-4 md:w-1/6" key={`row-${index}`}>
														<div className="h-full overflow-hidden border-2 border-gray-200 rounded-lg border-opacity-60">
															<Image
																src={dogSrc}
																alt="Picture of the dog"
																// placeholder="blur"
															/>
															<div className="p-6">
																<h2 className="mb-1 text-xs font-medium tracking-widest text-gray-400 title-font">
																	CATEGORY
																</h2>
																<h1 className="mb-3 text-lg font-medium text-gray-900 title-font">
																	The Dog
																</h1>
																<p className="mb-3 leading-relaxed">
																	A photo of a white bulldog sitting in the
																	meadow.
																</p>
																<div className="flex flex-wrap items-center ">
																	<a className="inline-flex items-center text-indigo-500 md:mb-2 lg:mb-0">
																		Learn More
																		<svg
																			className="w-4 h-4 ml-2"
																			viewBox="0 0 24 24"
																			stroke="currentColor"
																			strokeWidth="2"
																			fill="none"
																			strokeLinecap="round"
																			strokeLinejoin="round"
																		>
																			<path d="M5 12h14"></path>
																			<path d="M12 5l7 7-7 7"></path>
																		</svg>
																	</a>
																	<span className="inline-flex items-center py-1 pr-3 ml-auto text-sm leading-none text-gray-400 border-gray-200 lg:ml-auto md:ml-0">
																		<svg
																			className="w-4 h-4 mr-1"
																			stroke="currentColor"
																			strokeWidth="2"
																			fill="none"
																			strokeLinecap="round"
																			strokeLinejoin="round"
																			viewBox="0 0 24 24"
																		>
																			<path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
																		</svg>
																		2
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
