import Image from "next/image";
import { PaymentBtn } from "../../component/payments/pym-btn";
import { useRouter } from "next/router";
import Model from "react-3dmodelx";
import OnePointCarousel from "@/component/carousel/onePointCarousel";
import { useEffect, useState } from "react";
import axios from "axios";
import { IPostCard } from "@/component/carousel/PostCard";
import Head from "next/head";
import { errors, success } from "@/util/toastify";
import MViewer from "@/component/modelViewer";

export default function AssetId() {
	const router = useRouter();
	const { id } = router.query;
	console.log(id); // 번호

	const [assets, setAsset] = useState<IPostCard>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		getAssetDetail();
	}, []);

	const getAssetDetail = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get(
				`https://startail12-api.cpslab.or.kr/call?type=item_detail`,
				{
					params: { item_id: id },
				},
			);
			console.log(data);
			setAsset(data);
		} catch (error) {
			errors();
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const onSuccessFn = async () => {
		try {
			await axios.get(
				`https://startail12-api.cpslab.or.kr/call?type=download`,
				{
					params: { item_id: assets?.item_id },
				},
			);
			success();
		} catch (error) {
			errors();
		}
	};

	return (
		<>
			<Head>
				<title> Free3D - assets detail page </title>
				<meta name="description" content="assets detail page" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{isLoading ? (
				<></>
			) : (
				<section className="overflow-hidden text-gray-600 body-font">
					<div className="container px-5 py-24 mx-auto">
						<div className="flex flex-wrap mx-auto lg:w-4/5">
							<div className="w-full mt-6 lg:w-1/2 lg:p-10 lg:py-6 lg:mt-0">
								<OnePointCarousel>
									<Image
										src={`https://startail12-api.cpslab.or.kr/static/${assets?.Image_path}`}
										alt="Picture of the dog"
										className="object-cover object-center w-full overflow-hidden rounded h-72 lg:w-full lg:h-auto"
										width={100}
										height={100}
									/>
									<div className="flex justify-center object-cover object-center w-full overflow-hidden rounded h-72 lg:w-full lg:h-auto">
										<MViewer
											src={`https://startail12-api.cpslab.or.kr/static/${assets?._3d_path}`}
										/>
									</div>
								</OnePointCarousel>
							</div>
							<div className="w-full mt-6 lg:w-1/2 lg:pl-10 lg:py-6 lg:mt-0">
								<h2 className="text-sm tracking-widest text-gray-500 title-font">
									{assets?.category}
								</h2>
								<h1 className="mb-1 text-3xl font-medium text-gray-900 title-font">
									{assets?.title}
								</h1>
								<div className="flex mb-2">
									<span className="flex items-center">
										<a className="flex gap-2 text-gray-500">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												strokeWidth="2"
												stroke="currentColor"
												className="w-5 h-5"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
												/>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
												/>
											</svg>
											<span>{`${assets?.viewcount}`}</span>
										</a>
										<a className="flex gap-2 ml-2 text-gray-500">
											<svg
												fill="none"
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												className="w-5 h-5"
												viewBox="0 0 24 24"
											>
												<path d="M8 17l4 4 4-4m-4-5v9"></path>
												<path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"></path>
											</svg>
											<span>{`${assets?.downloadcount}`}</span>
										</a>
									</span>
									<span className="flex py-2 pl-3 ml-3 border-l-2 border-gray-200 space-x-2s">
										<a className="flex gap-2 text-gray-500">
											<svg
												fill="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												className="w-5 h-5"
												viewBox="0 0 24 24"
											>
												<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
											</svg>
											<span>{`${0}`}</span>
										</a>
									</span>
								</div>
								<p className="leading-relaxed">{assets?.description}</p>
								<div className="flex items-center pb-5 mt-6 mb-5 border-b-2 border-gray-100"></div>
								<div className="flex justify-between">
									<h1 className="text-2xl font-medium text-gray-900 title-font dark">
										{(assets?.price ?? 0).toLocaleString()} ₩
									</h1>
									<PaymentBtn
										orderName={assets?.title}
										amount={assets?.price}
										onSuccessFn={onSuccessFn}
									>
										<button className="flex px-6 py-2 ml-auto text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600">
											Buy
										</button>
									</PaymentBtn>
								</div>
							</div>
						</div>
					</div>
				</section>
			)}
		</>
	);
}
