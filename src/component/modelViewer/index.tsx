import React from "react";
import Model from "react-3dmodelx";
type Props = {
	src: string;
};
/**
 * @param param0 src 이미지 링크 (3d)
 * @returns 확장자 파일에 따라서 그에 맞는 모델을 실행 시킴 지원 모델 [.ply, .obj]
 */
const MViewer = ({ src }: Props) => {
	return (
		<>
			{src.slice(src.lastIndexOf(".")) === ".ply" && (
				<Model.PLY src={src} backgroundColor="gray" />
			)}
			{src.slice(src.lastIndexOf(".")) === ".obj" && (
				<Model.OBJ src={src} backgroundColor="gray" />
			)}
		</>
	);
};

export default MViewer;
