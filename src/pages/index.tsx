import React, { useEffect, useState } from "react";
import Head from "next/head";
import Hero from "@/component/home/hero";
import CarouselPosts from "@/component/carousel/CarouselPosts";
import axios from "axios";
import { IPostCard } from "@/component/carousel/PostCard";

export default function Home() {
	const [newList, setNewList] = useState<{
		category: string;
		data: IPostCard[];
	}>();
	const [hotList, setHotList] = useState<{
		category: string;
		data: IPostCard[];
	}>();
	useEffect(() => {
		getList();
	}, []);

	const getList = async () => {
		try {
			const new_list = await axios.get(
				`https://startail12-api.cpslab.or.kr/call?type=new_list`,
			);
			const hot_list = await axios.get(
				`https://startail12-api.cpslab.or.kr/call?type=hot_list`,
			);

			setNewList({ category: "New List", data: new_list.data });
			setHotList({ category: "Hot List", data: hot_list.data });
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<Head>
				<title> Free3D - main </title>
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
					{/* <div>
						{TempData.map((v, index) => {
							return (
								<CarouselPosts
									key={index}
									category={v.category}
									data={v.data}
								/>
							);
						})}
					</div> */}
					<div>
						{newList && (
							<CarouselPosts category={newList.category} data={newList.data} />
						)}
						{hotList && (
							<CarouselPosts category={hotList.category} data={hotList.data} />
						)}
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
