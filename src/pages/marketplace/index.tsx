// @flow
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
type Props = {
	sort_by: string;
	modal?: string;
	categories?: string;
};
function MarketPlace(props: Props) {
	const [model, setModel] = useState<string>(props.modal ?? "all");
	const [categories, setCategories] = useState<string>(
		props.categories ?? "all",
	);

	return (
		<div className="flex m-4">
			<div className="flex flex-col">
				{/* Filter */}
				<h2 className="mb-2 text-lg font-bold border-b border-sky-500">
					Model
				</h2>
				{[
					"All",
					"DALL·E",
					"Midjourney",
					"GPT",
					"PromptBase",
					"Stable Diffusion",
				].map((mb, key) => (
					<span key={key} className={`cursor-pointer hover:text-sky-500`}>
						{mb}
					</span>
				))}
				<h2 className="mb-2 text-lg font-bold border-b border-sky-500">
					Category
				</h2>
				{[
					"3D",
					"Accessory",
					"Ads",
					"Animal",
					"Anime",
					"Art",
					"Avatar",
					"Building",
					"Business",
					"Cartoon",
				].map((cg, key) => (
					<span key={key} className={`cursor-pointer hover:text-sky-500`}>
						{cg}
					</span>
				))}
			</div>
			<div className="w-full mx-5">
				<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
					{[1, 2, 3, 4, 5, 6, 7, 7, 8, 9, 9, 6, 5, 4, 3, 3, 2, 1].map(
						(t, i) => (
							<div key={i}>
								<Link href={`/posts/${"path"}`}>
									<article className="overflow-hidden rounded-md shadow-md hover:shadow-xl">
										<Image
											className="w-full"
											src={`/cat-1.jpg`}
											alt={"title"}
											width={300}
											height={200}
										/>
										<div className="flex flex-col items-center p-4">
											<time className="self-end text-gray-700">{"data"}</time>
											<h3 className="text-lg font-bold">{"title"}</h3>
											<p className="w-full text-center truncate">
												{"description"}
											</p>
											<span className="px-2 my-2 text-sm bg-green-100 rounded-lg">
												{"category"}
											</span>
										</div>
									</article>
								</Link>
							</div>
						),
					)}
				</ul>
			</div>
		</div>
	);
}

export default MarketPlace;
