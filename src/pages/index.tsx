import React from "react";
import Head from "next/head";
import Hero from "@/component/home/hero";
import CarouselPosts from "@/component/carousel/CarouselPosts";

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
					<div>
						{TempData.map((v, index) => {
							return (
								<CarouselPosts
									key={index}
									category={v.category}
									data={v.data}
								/>
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
