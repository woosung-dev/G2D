import style from "./gtd.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { RecommendType } from "@/type/category.type";
import fileDownload from "js-file-download";

export default function G2D() {
	const [text, setText] = useState<string>("");
	const [isLoading, setIsolating] = useState<boolean>();
	const [recommend, setRecommend] = useState<RecommendType>();
	const [model, setModel] = useState<string[]>();
	const [modelName, setModelName] = useState<string>();
	const [imgPreview, setImgPreview] = useState("");
	const [imgTemp, setImgTemp] = useState<any>(); // string으로 올거라는 생각
	const [file, setFile] = useState<File | null>();
	const [btnType, setBtnType] = useState<"submit" | "modify">("submit");

	useEffect(() => {
		console.log("useEffect");
		getModelList();
	}, []);

	// 모델 리스트 호출
	const getModelList = async () => {
		try {
			const { data } = await axios.get(
				"https://startail12-api.cpslab.or.kr/call?type=model_list",
			);
			setModel(data);
		} catch (error) {
			console.log(error);
		}
	};

	// 수정 prompt & Img 전송 API
	const onSubmitModiyGenerate = () => {
		// TODO: 이미지와 새로운 텍스트를 같이 보냄
		try {
			console.log(imgPreview);
			console.log(text);
		} catch (error) {
			console.log(error);
		}
	};

	// text to imag 요청
	const onSubmitText = async (search: string) => {
		// model 같이 보내기 확인 후
		try {
			setIsolating(true);

			const { data } = await axios.get(
				"https://startail12-api.cpslab.or.kr/call?type=discriminate",
				{
					params: { text: search },
					timeout: 0,
				},
			);
			console.log(data); //check

			setRecommend(data as RecommendType);
		} catch (error: any) {
			console.log(error);
		} finally {
			setTimeout(() => setIsolating(false), 2000);
		}
	};

	const onSubmitPrompt = async (prompt: string) => {
		try {
			setIsolating(true);
			const resp = await axios.post(
				"https://startail12-api.cpslab.or.kr/call?type=Diffusion",
				{ text: prompt },
				{
					headers: {
						"content-type": "multipart/form-data",
					},
					timeout: 0,
					responseType: "blob",
				},
			);
			console.log(resp); //check

			// 파일 url변환 하여 imag표시를 위한 작업
			setImgTemp(resp.data);
			viewFile(resp);
		} catch (error: any) {
			console.log(error);
		} finally {
			setTimeout(() => setIsolating(false), 2000);
		}
	};

	const onSubmit3D = async () => {
		try {
			const formData = new FormData();
			file && formData.append("Image", file); //setState 이전 처리한 값 로직 고려시 변경 가능성 있음
			const resp = await axios.post(
				"https://startail12-api.cpslab.or.kr/call?type=3D",
				formData,
				{
					headers: {
						"content-type": "multipart/form-data",
					},
					timeout: 0,
					responseType: "blob",
				},
			);
			console.log("resp", resp); //check

			// TODO: 파일 확장자 확인 해당 형식으로 받아올 수 있도록
			fileDownload(resp.data, "3D-object-file.ply");
		} catch (error: any) {
			console.log(error);
		}
	};

	// 파일 date 이미지에 표시하기 위한 설정 로직
	const viewFile = (resp: any) => {
		// TODO: 정확한 동작 확인 필요
		const result = "result";
		const newFile = new File([resp.data], result);

		// TODO: file객체 저장 이후 3D를 만들기 위한 1차 처리 확인 필요함
		setFile(newFile);
		console.log(newFile);
		const reader = new FileReader();
		reader.onload = (event) => {
			const previewImage = String(event.target?.result);
			console.log(previewImage);

			setImgPreview(previewImage);
		};
		reader.readAsDataURL(newFile);
	};

	const handleOnKeyPress = (event: any) => {
		if (event.key === "Enter") {
			onSubmitText(text); // Enter 입력이 되면 클릭 이벤트 실행
		}
	};

	return (
		<div className=" h-[calc(100vh-10em)]">
			<section className={style["layout-wrapper"]}>
				{isLoading ? (
					<div className={style["layout-loading-container"]}>loading...</div>
				) : (
					<div className={style["layout-content-wrapper"]}>
						{!modelName && (
							<div className="flex items-center justify-end gap-3 mt-4 ml-auto">
								<label className="font-medium ">Chose Model</label>
								<select
									className="w-48 p-2 bg-white border border-gray-300 form-select"
									onChange={(v) => setModelName(v.target.value)}
								>
									{!model && (
										<>
											<option value={"none"}>none</option>
											<option value={"test"}>test</option>
										</>
									)}
									{model &&
										model.map((v, index) => (
											<option value={v} key={index}>
												{v}
											</option>
										))}
								</select>
							</div>
						)}
						{/* recommend가 있을 때만 표시 */}
						{recommend && (
							<>
								<div className={style["content-wrapper"]}>
									<div className={style["content-category"]}>
										{/* category 응답 위치 넘어가면 잘림... TODO: 해당 부분 처리 확인 후*/}
										<span>{recommend.recommend}</span>
									</div>
									<div className={style["content-details"]}>
										{/* detail 응답 위치 map을 돌면서 값 표시 p*/}
										{Object.entries(recommend.detail).map(([key, value]) => {
											return (
												<div key={key}>
													<button
														onClick={() => onSubmitPrompt(value.prompt)}
														className={style["btn"]}
													>
														{value.prompt}
													</button>
													{": "}
													<span>{value.detail}</span>
												</div>
											);
										})}
									</div>
								</div>
								<div className={style["content-img-wrapper"]}>
									{imgPreview && (
										<div onClick={() => onSubmit3D()}>
											{/* 2번 안될경우 */}
											{/* <img
												src={imgTemp}
												alt="img-preview"
												width={600}
												height={600}
											/> */}
											<img
												src={imgPreview}
												alt="img-preview"
												width={600}
												height={600}
											/>
										</div>
									)}
									<button
										className="px-4 py-2 ml-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
										onClick={() => setBtnType("modify")}
									>
										Change Mode Modify
									</button>
								</div>
							</>
						)}
					</div>
				)}
				{/* model 선택되면 */}
				{modelName && (
					<div className={style["input-wrapper"]}>
						<input
							type="text"
							className={style["input-container"]}
							onChange={(e) => setText(e.target.value)}
							onKeyDown={(e) => handleOnKeyPress(e)}
							placeholder="send a message..."
						/>
						{btnType === "submit" ? (
							<button
								className="px-4 py-2 ml-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
								onClick={() => onSubmitText(text)}
							>
								submit
							</button>
						) : (
							<button
								className="px-4 py-2 ml-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
								onClick={() => onSubmitModiyGenerate()}
							>
								Modify
							</button>
						)}
					</div>
				)}
			</section>
		</div>
	);
}
