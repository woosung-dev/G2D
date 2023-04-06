import Link from "next/link";

export default function Header() {
	return (
		<>
			<header className="text-gray-600 body-font">
				<div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
					<Link
						href="/"
						className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0"
					>
						<img src="/favicon.ico" alt="test-image" width={25} height={25} />
						<span className="ml-3 text-xl">G2D</span>
					</Link>
					<nav className="flex flex-wrap items-center justify-center text-base cursor-pointer md:ml-auto">
						<Link href={"/gtd"} className="mr-5 hover:text-gray-900 ">
							New
						</Link>
						<Link href={"/chat-text"} className="mr-5 hover:text-gray-900">
							Create
						</Link>
						<Link href={"/upload-file"} className="mr-5 hover:text-gray-900">
							Upload
						</Link>
					</nav>
					<button className="inline-flex items-center px-3 py-1 mt-4 text-base bg-gray-100 border-0 rounded focus:outline-none hover:bg-gray-200 md:mt-0">
						Button
						<svg
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							className="w-4 h-4 ml-1"
							viewBox="0 0 24 24"
						>
							<path d="M5 12h14M12 5l7 7-7 7"></path>
						</svg>
					</button>
				</div>
			</header>
		</>
	);
}
