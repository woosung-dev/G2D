import React from "react";
import Model from "react-3dmodelx";
type Props = {
	src: string;
};
const MViewer = ({ src }: Props) => (
	<>
		{src.slice(src.lastIndexOf(".")) === "ply" && (
			<Model.PLY src={src} backgroundColor="gray" />
		)}
		{src.slice(src.lastIndexOf(".")) === "obj" && (
			<Model.PLY src={src} backgroundColor="gray" />
		)}
	</>
);

export default MViewer;
