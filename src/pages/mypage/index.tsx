import WithAuth from "@/component/auth/withAuth";
import PostCard, { IPostCard } from "@/component/carousel/PostCard";
import SellForm from "@/component/form/sellForm";
import Modal from "@/component/modal";
import HeroProfile from "@/component/profile/hero";
import useUser from "@/hooks/useUser";
import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";

const MyPage = () => {
	const { userData } = useUser();
	const [myList, setMyList] = useState<IPostCard[]>();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [itemId, setItemId] = useState<string>("");
	const [isModalsubmit, setIsModalsubmit] = useState(false);

	useEffect(() => {
		getMyList();
		// 랜더링 다시 되도록 처리
	}, [isModalsubmit]);

	const getMyList = async () => {
		try {
			const { data } = await axios.get<IPostCard[]>(
				`https://startail12-api.cpslab.or.kr/call?type=my_list`,
				{ params: { ID: userData.email } },
			);

			setMyList(data);
		} catch (error) {
			console.log(error);
		}
	};

	const onModalSubmit = () => {
		setIsModalOpen(false);
		setIsModalsubmit(!isModalsubmit);
	};

	return (
		<>
			<Head>
				<title> Free3D - my page </title>
				<meta name="description" content="my page" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="container px-5 py-24 mx-auto">
				<section className="flex flex-col items-center justify-center gray-600 min-fl body-font">
					<h2 className="mt-2 mb-4 text-6xl font-bold">my page</h2>
					<HeroProfile email={userData?.email ?? ""} />
					<div className="w-full my-14">
						<h2 className="my-2 text-2xl font-bold">{"Generate List"}</h2>
						<hr className="py-1" />
						<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
							{myList &&
								myList
									.filter((x, index) => {
										return !x.is_sell;
									})
									.map((x, index) => {
										return (
											<button
												key={index}
												onClick={() => {
													setIsModalOpen(true);
													setItemId(x.item_id);
												}}
											>
												<PostCard post={x} linkDisable={true} />
											</button>
										);
									})}
						</ul>

						<div className="w-full mt-14">
							<h2 className="my-2 text-2xl font-bold">{"Sell List"}</h2>
							<hr className="py-1" />
							<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
								{myList &&
									myList
										.filter((x, index) => {
											return x.is_sell;
										})
										.map((x, index) => {
											return <PostCard key={index} post={x} />;
										})}
							</ul>
						</div>
					</div>
					<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
						<SellForm itemId={itemId} onSubmit={() => onModalSubmit()} />
					</Modal>
				</section>
			</div>
		</>
	);
};

export default WithAuth(MyPage);
