// @flow
import PostCard, { IPostCard } from "@/component/carousel/PostCard";
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
			const [model, category] = await Promise.all([
				axios.get("https://startail12-api.cpslab.or.kr/call?type=model_list"),
				axios.get("https://startail12-api.cpslab.or.kr/call?type=get_category"),
			]);

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
			<div className="grid m-4 min-h-[calc(100vh-12em)] sm:flex">
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
				<div className="w-full p-5">
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
								<PostCard key={i} post={t} />
							))}
					</ul>
				</div>
			</div>
		</>
	);
}

export default MarketPlace;
