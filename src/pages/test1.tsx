// @flow
import * as React from "react";
import Model from "react-3dmodelx";

const Test1 = () => {
	return (
		<div>
			<Model.OBJ
				src={`https://startail12-api.cpslab.or.kr/static/startail03@gmail.com/generated_3d.obj`}
				backgroundColor="gray"
			/>
		</div>
	);
};

export default Test1;
