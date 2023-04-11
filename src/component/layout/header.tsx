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
						{/* TODO: 클릭 및 드롭다운 가능하도록 변경 */}
						<Link href={"/marketplace"} className="mr-5 hover:text-gray-900">
							Marketplace
						</Link>
						<Link href={"/generate"} className="mr-5 hover:text-gray-900 ">
							Generate
						</Link>
						{/* TODO: 클릭 및 드롭다운 가능하도록 변경 dark mode 해당 부분 안에 포함*/}
						<Link href={"/account"} className="mr-5 hover:text-gray-900">
							Account
						</Link>
						{/* TODO: 아이콘 또는 특별한 표시 추가 해야함 */}
						<Link href={"/sell"} className="mr-5 hover:text-gray-900">
							Sell
						</Link>
					</nav>
					{/* button */}
					<DarkModeToggleButton />
				</div>
			</header>
		</>
	);
}
