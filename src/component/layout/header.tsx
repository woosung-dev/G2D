import Link from "next/link";
import DarkModeToggleButton from "../dark-mode-toggle-button";
import useUser from "@/hooks/useUser";

export default function Header() {
	const { isLoggedIn } = useUser();

	return (
		<>
			<header className="text-gray-600 body-font">
				<div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
					<Link
						href="/"
						className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0"
					>
						<img src="/favicon.ico" alt="test-image" width={25} height={25} />
						<span className="ml-3 text-xl">Free3D</span>
					</Link>
					<nav className="flex flex-wrap items-center justify-center text-base cursor-pointer md:ml-auto">
						<Link href={"/assets"} className="mr-5 hover:text-gray-900">
							Marketplace
						</Link>
						<Link href={"/generate"} className="mr-5 hover:text-gray-900 ">
							Generate
						</Link>
						{/*login 상태에 따라서 변경 기본 Login 이후 mypage 나 accout */}
						{!isLoggedIn ? (
							<Link href={"/login"} className="mr-5 hover:text-gray-900">
								Login
							</Link>
						) : (
							<Link href={"/mypage"} className="mr-5 hover:text-gray-900">
								My page
							</Link>
						)}
					</nav>
					{/* button */}
					<DarkModeToggleButton />
				</div>
			</header>
		</>
	);
}
