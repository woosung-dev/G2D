import HeroProfile from "@/component/profile/hero";
import Image from "next/image";
import React from "react";

const MyPage = () => {
	// 판매 중인 항목
	// 등록한 항목

	return (
		<div className="container px-5 py-24 mx-auto">
			<section className="flex flex-col items-center justify-center gray-600 min-fl body-font">
				<h2 className="mt-2 mb-4 text-6xl font-bold">my page</h2>
				<HeroProfile email={"wooosung@gmail.ocm"} />

				<div className="w-full my-14">
					<h2 className="my-2 text-2xl font-bold">{"A"}</h2>
					<hr />
					<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
						{[1, 2, 3, 5, 4, 4, 4, 4, 4].map((x, index) => {
							return (
								<article
									className="overflow-hidden rounded-md shadow-md hover:shadow-xl"
									key={index}
								>
									<div>
										<Image
											className="w-full"
											src={`/cat-1.jpg`}
											alt={"title"}
											width={300}
											height={200}
										/>
									</div>
								</article>
							);
						})}
					</ul>

					<div className="w-full mt-14">
						<h2 className="my-2 text-2xl font-bold">{"B"}</h2>
						<hr />
						<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
							{[1, 2, 3, 5, 4, 4, 4, 4, 4].map((x, index) => {
								return (
									<article
										className="overflow-hidden rounded-md shadow-md hover:shadow-xl"
										key={index}
									>
										<div>
											<Image
												className="w-full"
												src={`/cat-1.jpg`}
												alt={"title"}
												width={300}
												height={200}
											/>
										</div>
									</article>
								);
							})}
						</ul>
					</div>
				</div>
			</section>
		</div>
	);
};

export default MyPage;
