import { success, errors } from "@/util/toastify";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
type Props = {
	itemId: string;
	onSubmit?: () => void;
};
const SellForm = ({ itemId, onSubmit }: Props) => {
	const [category, setCategory] = useState<string>();
	const [price, setPrice] = useState<string>();
	const [description, setDescription] = useState<string>();
	const [title, seTitle] = useState<string>();
	const router = useRouter();

	const onSellItem = async () => {
		try {
			const formData = new FormData();
			formData.append("item_id", itemId ?? "");
			formData.append("category", category ?? "");
			formData.append("price", price ?? "0");
			formData.append("description", description ?? "");
			formData.append("title", title ?? "");

			const { data } = await axios.post(
				"https://startail12-api.cpslab.or.kr/call?type=Sell",
				formData,
			);

			onSubmit && onSubmit();
			success();
		} catch (error) {
			errors();
			console.log(error);
		}
	};
	return (
		<section>
			<div className="container flex flex-wrap items-center px-5 mx-auto">
				<div className="flex flex-col w-full p-8 mt-10rounded-lg md:mx-auto md:mt-0">
					<h2 className="mb-5 text-lg font-medium text-gray-900 title-font">
						Sell 3D Model
					</h2>
					<div className="relative mb-4">
						<label htmlFor="title" className="text-sm leading-7 text-gray-600">
							Title
						</label>
						<input
							type="text"
							id="title"
							name="title"
							className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
							onChange={(e) => seTitle(e.target.value)}
							required
						/>
					</div>
					<div className="relative mb-4">
						<label
							htmlFor="category"
							className="text-sm leading-7 text-gray-600"
						>
							Category
						</label>
						<input
							type="text"
							id="category"
							name="category"
							className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
							onChange={(e) => setCategory(e.target.value)}
							required
						/>
					</div>
					<div className="relative mb-4">
						<label
							htmlFor="description"
							className="text-sm leading-7 text-gray-600"
						>
							Description
						</label>
						<input
							type="text"
							id="description"
							name="description"
							className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
							onChange={(e) => setDescription(e.target.value)}
							required
						/>
					</div>
					<div className="relative mb-4">
						<label htmlFor="price" className="text-sm leading-7 text-gray-600">
							Price
						</label>
						<input
							type="text"
							id="price"
							name="price"
							className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
							onChange={(e) => setPrice(e.target.value)}
							required
						/>
					</div>
					<button
						className={`px-8 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600 mt-6`}
						onClick={() => onSellItem()}
						disabled={!category || !price || !description || !title}
					>
						Sell Item
					</button>
				</div>
			</div>
		</section>
	);
};

export default SellForm;
