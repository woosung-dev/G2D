import dogSrc from "../../../public/dog-1.jpg";
import Image from "next/image";
import { PaymentBtn } from "../../component/payments/pym-btn";

export default function AssetId(id: string) {
	return (
		<section className="overflow-hidden text-gray-600 body-font">
			<div className="container px-5 py-24 mx-auto">
				<div className="flex flex-wrap mx-auto lg:w-4/5">
					<Image
						src={dogSrc}
						alt="Picture of the dog"
						className="object-cover object-center w-full h-64 rounded lg:w-1/2 lg:h-auto"
					/>
					<div className="w-full mt-6 lg:w-1/2 lg:pl-10 lg:py-6 lg:mt-0">
						<h2 className="text-sm tracking-widest text-gray-500 title-font">
							Category
						</h2>
						<h1 className="mb-1 text-3xl font-medium text-gray-900 title-font">
							The Dog
						</h1>
						<div className="flex mb-4">
							<span className="flex items-center">
								<svg
									fill="currentColor"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									className="w-4 h-4 text-indigo-500"
									viewBox="0 0 24 24"
								>
									<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
								</svg>
								<svg
									fill="currentColor"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									className="w-4 h-4 text-indigo-500"
									viewBox="0 0 24 24"
								>
									<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
								</svg>
								<svg
									fill="currentColor"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									className="w-4 h-4 text-indigo-500"
									viewBox="0 0 24 24"
								>
									<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
								</svg>
								<svg
									fill="currentColor"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									className="w-4 h-4 text-indigo-500"
									viewBox="0 0 24 24"
								>
									<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
								</svg>
								<svg
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									className="w-4 h-4 text-indigo-500"
									viewBox="0 0 24 24"
								>
									<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
								</svg>
								<span className="ml-3 text-gray-600">4 Reviews</span>
							</span>
							<span className="flex py-2 pl-3 ml-3 border-l-2 border-gray-200 space-x-2s">
								<a className="text-gray-500">
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
								</a>

								<a className="text-gray-500">
									<svg
										fill="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										className="w-5 h-5"
										viewBox="0 0 24 24"
									>
										<path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
									</svg>
								</a>
								<a className="text-gray-500">
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
								</a>
							</span>
						</div>
						<p className="leading-relaxed">
							Dogs are one of the most beloved and popular domesticated animals
							in the world. They are known for their loyalty, affection, and
							playful nature. Dogs come in a wide variety of breeds, each with
							its own unique physical characteristics and personality traits.
						</p>
						<div className="flex items-center pb-5 mt-6 mb-5 border-b-2 border-gray-100"></div>
						<div className="flex">
							<span className="text-2xl font-medium text-gray-900 title-font">
								$2.59
							</span>
							<PaymentBtn>
								<button className="flex px-6 py-2 ml-auto text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600">
									Buy
								</button>
							</PaymentBtn>
							<button className="inline-flex items-center justify-center w-10 h-10 p-0 ml-4 text-gray-500 bg-gray-200 border-0 rounded-full">
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
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
