import React from "react";
import Model from "react-3dmodelx";
type Props = {
	src?: any;
};
// eslint-disable-next-line react/display-name
const MViewer = ({ src }: Props) => (
	<div style={{ maxWidth: 800, width: "100%", height: 400, margin: "auto" }}>
		<Model.PLY src={src ?? "./ch3d.ply"} backgroundColor="gray" />
	</div>
);

export default MViewer;
