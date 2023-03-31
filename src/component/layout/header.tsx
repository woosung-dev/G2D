import Link from "next/link";
import style from "./header.module.scss";

export default function Header() {
	return (
		<>
			<div className={style["header"]}>
				<div>
					{/* <img src="/public/favicon.ico" alt="test-image" /> */}
					<a href="/" className={style["logo"]}>
						Logo C2D
					</a>
				</div>
				<div className={style["header-left"]}>
					<Link href="/chat-text">Text</Link>
					<Link href="upload-file">Image</Link>
					<Link href="upload-diffusion">Diffusion</Link>
				</div>
			</div>
		</>
	);
}
