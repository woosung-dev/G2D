import style from "./gtd.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { RecommendType } from "@/type/category.type";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import Head from "next/head";
import WithAuth from "@/component/auth/withAuth";
import { success } from "@/util/toastify";
import Image from "next/image";
import gd from "../../../public/guideline.png";
import MViewer from "@/component/modelViewer";
import { MarkDownHtml } from "@/component/markdown";
import { info } from "@/util/toastify";

function G2D() {
	const [text, setText] = useState<string>("");
	const [isLoading, setIsolating] = useState<boolean>();
	const [recommend, setRecommend] = useState<RecommendType>();
	const [model, setModel] = useState<string[]>();
	const [modelName, setModelName] = useState<string>("");
	const [img2D, setImg2D] = useState("");
	const [img3D, setImg3D] = useState("");
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
		setImg3D("");
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

	const selectModel = (model: string) => {
		setModelName(model);
		info(
			"생성 하고자 하는 object를 묘사하는 문장을 작성 후 submit 버튼을 눌러주세요.",
		);
		info("묘사가 부족한 부분과 예시가 챗봇을 통해 제공됩니다.");
	};

	// text to img 요청
	const onSubmitText = async (search: string) => {
		// model 같이 보내기 확인 후
		try {
			setIsolating(true);
			resetState();
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
			info("생성 하고자 하는 object와 가장 가까운 문장을 선택 해주세요.");
			info("묘사한 문장을 토대로 챗봇이 이미지를 생성합니다.");
		} catch (error: any) {
			console.log(error);
		} finally {
			setIsolating(false);
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
			setImg3D("");
			setImg2D(resp.data);
			setIsViewModifyBtn(true);
			info(
				"이미지 하단에 존재하는 Change Mode Modify 버튼을 클릭 후, 추가 적인 문장을 작성하여 이미지를 수정 할 수 있습니다.",
			);
			info(
				"만족스러운 이미지라면 Change 3D 버튼을 통해 3D objects를 생성해 보세요! ~ ",
			);
		} catch (error: any) {
			console.log(error);
		} finally {
			setIsSaveBtn(false);
			setIsolating(false);
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
			setImg3D("");
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
			formData.append("Image", data); //setState 이전 처리한 값 로직 고려시 변경 가능성 있음

			const resp = await axios.post(
				"https://startail12-api.cpslab.or.kr/call?type=Modify",
				formData,
			);
			console.log(resp); //check
			setFile(data);
			setImg2D(resp.data);
		} catch (error: any) {
			console.log(error);
		} finally {
			setBtnType("submit");
			setIsSaveBtn(false);
			setIsolating(false);
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

			setIsSaveBtn(true);
			setImg3D(resp.data);
			setImg2D(""); // 3d 생성 이후 2d 이미지를 바로 쓸일이 없고, Difustion을 통해 생성 해야되며, change 2d이미지를 제거 하기 위해 설정
			info("Save 버튼을 눌러 완성된 3D 모델을 저장하세요! ~");
		} catch (error: any) {
			console.log(error);
		} finally {
			setIsViewModifyBtn(false);
			setIsolating(false);
		}
	};

	// 3D 이미지 저장
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

	const handleOnKeyPress = (event: any) => {
		if (event.key === "Enter") {
			btnType === "submit"
				? onSubmitText(text) // Enter 입력이 되면 클릭 이벤트 실행
				: onSubmitModifyGenerate();
		}
	};

	return (
		<>
			<Head>
				<title> Free3D - generate page </title>
				<meta name="description" content="generate page" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{/* TODO: 높이 설정 부분 확인이 필요함... 좋은 설정 찾아보기 */}
			<div className="min-h-[calc(100vh-12em)] container px-5 mx-auto flex">
				<section className="flex flex-col w-full min-h-full mx-auto my-8">
					{isLoading ? (
						<>
							<div className="mt-6 mt-auto text-center">
								<div className="inline-flex items-center justify-start gap-1">
									<svg
										role="status"
										className="w-8 h-8 mr-2 text-gray-100 animate-spin fill-sky-600 dark:text-gray-600"
										viewBox="0 0 100 101"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
											fill="currentColor"
										></path>
										<path
											d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
											fill="currentFill"
										></path>
									</svg>
									<span>Loading ......</span>
								</div>
							</div>
						</>
					) : (
						<div className="flex justify-center">
							{/* 모델 내임이 있을 경우 model을 선택한 이후 만 잠깐 표시됨 */}
							{!modelName && (
								<div className="flex flex-col gap-2">
									<div className="flex items-center justify-center w-full gap-3 mt-4 ml-auto">
										<label className="font-medium ">Chose Model</label>
										<select
											className="w-48 p-2 bg-white border border-gray-300 form-select dark:text-gray-500"
											defaultValue={"none"}
											value={modelName}
											onChange={(e) => selectModel(e.target.value)}
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
							{/* <section className="grid min-h-full grid-cols-1 gap-4 mx-auto my-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2"></section> */}
							{/* recommend가 있을 때만 표시 */}
							{recommend ? (
								<div
									className={`grid min-h-full grid-cols-1 gap-4 mx-auto my-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 ${
										!img2D && "!grid-cols-1"
									}`}
								>
									<div className={style["content-wrapper"]}>
										<div className={style["content-details"]}>
											{/* category 응답 위치 넘어가면 잘림... TODO: 해당 부분 처리 확인 후*/}
											<span>
												<MarkDownHtml
													value={recommend.recommend.replaceAll("\n", "<br />")}
												/>
											</span>
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
														<span>
															<MarkDownHtml
																value={value.detail.replaceAll("\n", "<br />")}
															/>
														</span>
													</div>
												);
											})}
										</div>
									</div>
									<div className="flex flex-col">
										{img3D ? (
											<>
												<MViewer
													src={`https://startail12-api.cpslab.or.kr/static/${img3D}`}
												/>
											</>
										) : (
											img2D && (
												<>
													<div className="flex flex-col items-center justify-center">
														<Image
															src={`https://startail12-api.cpslab.or.kr/static/${img2D}`}
															alt="img-preview"
															width={600}
															height={600}
															unoptimized
														/>
													</div>
												</>
											)
										)}
										<div className="flex items-center justify-around pt-3 pb-5">
											{img2D && (
												<button
													className="px-4 py-2 ml-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
													onClick={() => onSubmit3D()}
												>
													Change 3D
												</button>
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
									</div>
								</div>
							) : (
								<>
									{/* 검색 화며에서도 보여야하는 항목 (입력 전이면서 모델선택이 된) */}
									{modelName && (
										<div className="mt-8">
											<Image src={gd} alt={"가이드 라인"} />
										</div>
									)}
								</>
							)}
						</div>
					)}
					{/* model 선택되면 */}
					{modelName && (
						<div className={style["input-wrapper"]}>
							<input
								type="text"
								className="flex flex-grow w-full p-2 border bg-gray-50 rounded-3xl focus:border-gray-200 dark:text-gray-500"
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
