import style from "./gtd.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { RecommendType } from "@/type/category.type";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import Model from "react-3dmodelx";
import Head from "next/head";
import WithAuth from "@/component/auth/withAuth";
import { success } from "@/util/toastify";
import Image from "next/image";
import gd from "../../../public/guideline.png";

function G2D() {
	const [text, setText] = useState<string>("");
	const [isLoading, setIsolating] = useState<boolean>();
	const [recommend, setRecommend] = useState<RecommendType>();
	const [model, setModel] = useState<string[]>();
	const [modelName, setModelName] = useState<string>("");
	const [imgPreview, setImgPreview] = useState("");
	const [img2D, setImg2D] = useState("");
	const [img3D, setImg3D] = useState("");
	const [imgTemp, setImgTemp] = useState<any>(); // string으로 올거라는 생각
	const [file, setFile] = useState<File | null>();
	const [file3D, setFile3D] = useState<File | null>();
	const [btnType, setBtnType] = useState<"submit" | "modify">("submit");
	const [isViewModifyBtn, setIsViewModifyBtn] = useState<boolean>(false);
	const [isSaveBtn, setIsSaveBtn] = useState<boolean>(false);
	const { isLoggedIn, userData } = useUser();
	const router = useRouter();

	useEffect(() => {
		console.log("useEffect");
		getModelList();
	}, []);

	const resetState = () => {
		setIsSaveBtn(false);
		setIsViewModifyBtn(false);
		setImg2D("");
		setImg2D("");
		setImgPreview("");
	};

	// 모델 리스트 호출
	const getModelList = async () => {
		try {
			setIsolating(true);
			const { data } = await axios.get(
				"https://startail12-api.cpslab.or.kr/call?type=model_list",
			);
			setModel(data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsolating(false);
			resetState();
		}
	};

	// text to img 요청
	const onSubmitText = async (search: string) => {
		// model 같이 보내기 확인 후
		try {
			setIsolating(true);
			const formData = new FormData();
			formData.append("text", search);
			formData.append("model_name", modelName);
			formData.append("ID", userData.email ?? "woosung@gmail.com");
			const { data } = await axios.post(
				"https://startail12-api.cpslab.or.kr/call?type=discriminate",
				formData,
			);
			console.log(data); //check
			setRecommend(data as RecommendType);
		} catch (error: any) {
			console.log(error);
		} finally {
			resetState();
			setTimeout(() => setIsolating(false), 2000);
		}
	};

	// 2D image 가져오는 함수
	const onSubmitPrompt = async (prompt: string) => {
		try {
			setIsolating(true);
			const formData = new FormData();
			formData.append("text", prompt);
			formData.append("model_name", modelName);
			formData.append("ID", userData.email ?? "woosung@gmail.com");
			const resp = await axios.post(
				"https://startail12-api.cpslab.or.kr/call?type=Diffusion",
				formData,
			);
			console.log(resp); //check

			// 파일 url변환 하여 imag표시를 위한 작업
			// setImgTemp(resp.data);
			// viewFile2D(resp);
			setImg2D(resp.data);
			setIsViewModifyBtn(true);
		} catch (error: any) {
			console.log(error);
		} finally {
			setIsSaveBtn(false);
			setTimeout(() => setIsolating(false), 2000);
		}
	};

	// 수정 prompt & Img 전송 API
	const onSubmitModifyGenerate = async () => {
		try {
			setIsolating(true);
			const formData = new FormData();
			formData.append("text", text);
			formData.append("model_name", modelName);
			formData.append("ID", userData.email ?? "woosung@gmail.com");
			const { data } = await axios.get(
				`https://startail12-api.cpslab.or.kr/static/${img2D}`,
				{
					headers: {
						"content-type": "multipart/form-data",
					},
					timeout: 0,
					responseType: "blob",
				},
			);
			setFile(data);
			formData.append("Image", data); //setState 이전 처리한 값 로직 고려시 변경 가능성 있음

			const resp = await axios.post(
				"https://startail12-api.cpslab.or.kr/call?type=Modify",
				formData,
			);
			console.log(resp); //check

			// 파일 url변환 하여 imag표시를 위한 작업
			// viewFile2D(resp);
			setImgTemp(resp.data);
		} catch (error: any) {
			console.log(error);
		} finally {
			setBtnType("submit");
			setIsSaveBtn(false);
			setTimeout(() => setIsolating(false), 2000);
		}
	};

	// 3D image 가져오는 함수
	const onSubmit3D = async () => {
		try {
			setIsolating(true);
			const formData = new FormData();
			formData.append("model_name", modelName);
			formData.append("ID", userData.email ?? "woosung@gmail.com");
			const { data } = await axios.get(
				`https://startail12-api.cpslab.or.kr/static/${img2D}`,
				{
					headers: {
						"content-type": "multipart/form-data",
					},
					timeout: 0,
					responseType: "blob",
				},
			);
			setFile(data);

			formData.append("Image", data); //setState 이전 처리한 값 로직 고려시 변경 가능성 있음
			const resp = await axios.post(
				"https://startail12-api.cpslab.or.kr/call?type=3D",
				formData,
			);
			console.log("resp", resp); //check

			// TODO: 파일 확장자 확인 해당 형식으로 받아올 수 있도록
			// setFile3D(new File([resp.data], "3D_IMAGE"));
			// setImgTemp(resp.data);
			// fileDownload(resp.data, "3D-object-file.ply");
			setIsSaveBtn(true);
			setImg3D(resp.data);
		} catch (error: any) {
			console.log(error);
		} finally {
			setIsViewModifyBtn(false);
			setIsolating(false);
		}
	};

	const onSave = async () => {
		try {
			setIsolating(true);
			const formData = new FormData();
			formData.append("model_name", modelName);
			formData.append("ID", userData.email ?? "woosung@gmail.com");
			const resp = await axios.post(
				"https://startail12-api.cpslab.or.kr/call?type=Save",
				formData,
			);

			success("Save success");
			router.push("/");
		} catch (error: any) {
			console.log(error);
		}
	};

	// 파일 date 이미지에 표시하기 위한 설정 로직
	// const viewFile2D = (resp: any) => {
	// 	// TODO: 정확한 동작 확인 필요
	// 	const result = "2D_IMAGE";
	// 	const newFile = new File([resp.data], result);

	// 	setFile(newFile);
	// 	const reader = new FileReader();
	// 	reader.onload = (event) => {
	// 		const previewImage = String(event.target?.result);
	// 		console.log(previewImage);

	// 		setImgPreview(previewImage);
	// 	};
	// 	reader.readAsDataURL(newFile);
	// };

	const handleOnKeyPress = (event: any) => {
		if (event.key === "Enter") {
			onSubmitText(text); // Enter 입력이 되면 클릭 이벤트 실행
		}
	};

	return (
		<>
			<Head>
				<title> Free3D - generate page </title>
				<meta name="description" content="generate page" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="h-[calc(100vh-12em)] container px-5 py-24 mx-auto">
				<section className="flex flex-col min-h-full mx-auto my-8">
					{isLoading ? (
						<div className={style["layout-loading-container"]}>loading...</div>
					) : (
						<div className="flex justify-center">
							{!modelName && (
								<div className="flex flex-col">
									<div className="flex items-center justify-center w-full gap-3 mt-4 ml-auto">
										<label className="font-medium ">Chose Model</label>
										<select
											className="w-48 p-2 bg-white border border-gray-300 form-select"
											defaultValue={"none"}
											value={modelName}
											onChange={(e) => setModelName(e.target.value)}
										>
											<option value="" selected disabled>
												Choose a model!
											</option>
											{model &&
												model.map((v, index) => (
													<option
														value={v}
														key={index}
														onClick={() => setModelName(v)}
													>
														{v}
													</option>
												))}
										</select>
									</div>
									<div className="mt-8">
										<Image src={gd} alt={"가이드 라인"} />
									</div>
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
									<div className="flex flex-col">
										{img3D ? (
											<>
												<Model.PLY
													src={`https://startail12-api.cpslab.or.kr/static/${img3D}`}
													backgroundColor="gray"
												/>
											</>
										) : (
											img2D && (
												<>
													<div className="flex flex-col items-center justify-center">
														<img
															src={`https://startail12-api.cpslab.or.kr/static/${img2D}`}
															alt="img-preview"
															width={600}
															height={600}
														/>
														<button
															className="px-4 py-2 ml-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
															onClick={() => onSubmit3D()}
														>
															Change 3D
														</button>
													</div>
												</>
											)
										)}
										{isViewModifyBtn && (
											<button
												className="px-4 py-2 ml-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
												onClick={() => setBtnType("modify")}
											>
												Change Mode Modify
											</button>
										)}
										{isSaveBtn && (
											<button
												className="px-4 py-2 ml-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
												onClick={() => onSave()}
											>
												Save
											</button>
										)}
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
								className="flex flex-grow p-2 border bg-gray-50 rounded-3xl focus:border-gray-200"
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
									onClick={() => onSubmitModifyGenerate()}
								>
									Modify
								</button>
							)}
						</div>
					)}
				</section>
			</div>
		</>
	);
}

export default WithAuth(G2D);
