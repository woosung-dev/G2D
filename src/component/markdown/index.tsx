// @flow
import * as React from "react";
type Props = { value: string };
export const MarkDownHtml = (props: Props) => {
	return <span dangerouslySetInnerHTML={{ __html: props.value }} />;
};
