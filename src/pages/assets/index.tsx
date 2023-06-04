// @flow
import { IPostCard } from "@/component/carousel/PostCard";
import axios from "axios";
import dayjs from "dayjs";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type AssetsFilter = {
	categories?: string;
	model?: string;
};

type Props = {
	sort_by: string;
	modal?: string;
	categories?: string;
};
function MarketPlace(props: Props) {
	useEffect(() => {
		getArticleList();
		getModelList();
	}, []);
	const [filtered, setFiltered] = useState<AssetsFilter>({});
	const [articles, setArticles] = useState<IPostCard[]>([]);
	const [model, setModel] = useState<string[]>();
	const [category, setCategory] = useState<string[]>();

	const getArticleList = async () => {
		try {
			const { data } = await axios.get(
				"https://startail12-api.cpslab.or.kr/call?type=search_list",
			);
			setArticles(data);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	// 모델 리스트 호출
	const getModelList = async () => {
		try {
			const model = await axios.get(
				"https://startail12-api.cpslab.or.kr/call?type=model_list",
			);
			const category = await axios.get(
				"https://startail12-api.cpslab.or.kr/call?type=get_category",
			);

			setCategory(category.data);
			setModel(model.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Head>
				<title> Free3D - assets page </title>
				<meta name="description" content="assets page" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="flex m-4">
				<div className="flex flex-col">
					{/* Filter */}
					<h2 className="mb-2 text-lg font-bold border-b border-sky-500 ">
						ALL
					</h2>
					<span
						key={1}
						className={`cursor-pointer hover:text-sky-500 ${
							filtered.categories == filtered.model && "text-sky-600"
						}`}
						onClick={() => setFiltered({ model: "all", categories: "all" })}
					>
						{"All"}
					</span>

					<h2 className="mb-2 text-lg font-bold border-b border-sky-500">
						Model
					</h2>
					{(model ?? []).map((mb, key) => (
						<span
							key={key}
							className={`cursor-pointer hover:text-sky-500 ${
								mb === filtered.model && "text-sky-600"
							}`}
							onClick={() => setFiltered({ model: mb })}
						>
							{mb}
						</span>
					))}
					<h2 className="mb-2 text-lg font-bold border-b border-sky-500">
						Category
					</h2>
					{(category ?? []).map((cg, key) => (
						<span
							key={key}
							className={`cursor-pointer hover:text-sky-500 ${
								cg === filtered.categories && "text-sky-600"
							}`}
							onClick={() => setFiltered({ categories: cg })}
						>
							{cg}
						</span>
					))}
				</div>
				<div className="w-full mx-5">
					<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
						{/* filter 결과 반환 */}
						{articles
							.filter((f) => {
								if (filtered?.categories == filtered?.model) return true;
								if (
									f.category == filtered?.categories ||
									f.model_name == filtered?.model
								) {
									return true;
								}
								return false;
							})
							.map((t, i) => (
								<div key={i}>
									<Link href={`/assets/${t.item_id}`}>
										<article className="overflow-hidden rounded-md shadow-md hover:shadow-xl">
											<Image
												className="w-full"
												src={`https://startail12-api.cpslab.or.kr/static/${t.Image_path}`}
												alt={"title"}
												width={300}
												height={200}
											/>
											<div className="flex flex-col items-center p-4">
												<time className="self-end text-gray-700">
													{t.create_time
														? dayjs(t.create_time).format("YYYY-MM-DD")
														: dayjs().format("YYYY-MM-DD")}
												</time>
												<h3 className="text-lg font-bold">
													{t.title ?? "title"}
												</h3>
												<p className="w-full text-center truncate">
													{t.description ?? "description"}
												</p>
												<span className="px-2 my-2 text-sm bg-green-100 rounded-lg">
													{t.category ?? "category"}
												</span>
											</div>
										</article>
									</Link>
								</div>
							))}
					</ul>
				</div>
			</div>
		</>
	);
}

export default MarketPlace;
