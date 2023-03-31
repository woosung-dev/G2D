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
					<a href="/chat-text">Create</a>
					<a href="upload-file">upload</a>
				</div>
			</div>
		</>
	);
}
