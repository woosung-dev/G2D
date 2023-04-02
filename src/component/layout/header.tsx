import style from "./header.module.scss";

export default function Header() {
	return (
		<>
			<div className={style["header"]}>
				<div>
					<a href="/" className={style["logo"]}>
						<img src="/favicon.ico" alt="test-image" width={25} height={25} />{" "}
						C2D
					</a>
				</div>
				<div className={style["header-left"]}>
					<a href="/gtd">New</a>
					<a href="/chat-text">Create</a>
					<a href="upload-file">Upload</a>
				</div>
			</div>
		</>
	);
}
