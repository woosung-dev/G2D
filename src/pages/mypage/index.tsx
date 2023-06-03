import PostCard from "@/component/carousel/PostCard";
import HeroProfile from "@/component/profile/hero";
import useUser from "@/hooks/useUser";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const MyPage = () => {
	const { userData } = useUser();
	const [myList, setMyList] = useState();
	useEffect(() => {
		getMyList();
	}, []);
	const getMyList = async () => {
		try {
			const { data } = await axios.get(
				`https://startail12-api.cpslab.or.kr/call?type=my_list`,
				{ params: { ID: userData.email ?? "woosung@gmail.com" } },
			);
			console.log(data);

			setMyList(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container px-5 py-24 mx-auto">
			<section className="flex flex-col items-center justify-center gray-600 min-fl body-font">
				<h2 className="mt-2 mb-4 text-6xl font-bold">my page</h2>
				<HeroProfile email={"wooosung@gmail.ocm"} />

				<div className="w-full my-14">
					<h2 className="my-2 text-2xl font-bold">{"Generate List"}</h2>
					<hr className="py-1" />
					<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
						{[1, 2, 3, 5, 4, 4, 4, 4, 4].map((x, index) => {
							return <PostCard key={index} post={{}} />;
						})}
					</ul>

					<div className="w-full mt-14">
						<h2 className="my-2 text-2xl font-bold">{"Sell List"}</h2>
						<hr className="py-1" />
						<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
							{[1, 2, 3, 5, 4, 4, 4, 4, 4].map((x, index) => {
								return <PostCard key={index} post={{}} />;
							})}
						</ul>
					</div>
				</div>
			</section>
		</div>
	);
};

export default MyPage;
