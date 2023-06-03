import Modal from "@/component/modal";
import MViewer from "@/component/modelViewer";
import React from "react";

// 테스트를 위해 만든 page
// eslint-disable-next-line react/display-name
export default () => (
	<>
		<Modal isOpen={true} onClose={() => false} />
		<MViewer src={"https://startail12-api.cpslab.or.kr/static/mesh_1b.ply"} />
	</>
);
