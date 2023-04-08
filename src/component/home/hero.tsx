import Animation from "./animation";

export default function Hero() {
	return (
		<>
			<div className="flex flex-col items-center mb-16 text-center lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:items-start md:text-left md:mb-0">
				<h1 className="mb-4 text-3xl font-medium text-gray-900 title-font sm:text-4xl">
					DALL·E, GPT, Midjourney,
					<br className="hidden lg:inline-block" />
					Stable Diffusion,ChatGPT
					<br className="hidden lg:inline-block" />
					Prompt Marketplace
				</h1>
				<p className="mb-8 leading-relaxed">
					Find top prompts, produce better results, save on API costs, sell your
					own prompts.
				</p>
				<div className="flex justify-center">
					<button className="btn-project">Find a prompt</button>
					<button className="inline-flex px-6 py-2 ml-4 text-lg text-gray-700 bg-gray-100 border-0 rounded focus:outline-none hover:bg-gray-200">
						Sell a prompt
					</button>
				</div>
			</div>
			<div className="w-5/6 lg:max-w-lg lg:w-full md:w-1/2">
				<Animation />
			</div>
		</>
	);
}
