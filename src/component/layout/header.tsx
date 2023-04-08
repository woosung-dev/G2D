import Link from "next/link";
import DarkModeToggleButton from "../dark-mode-toggle-button";

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
					{/* button */}
					<DarkModeToggleButton />
				</div>
			</header>
		</>
	);
}
