// @flow
import useUser from "@/hooks/useUser";
import { fetcherWithToken } from "@/util/request";
import * as React from "react";
import Modal from "@/component/modal";
import SellForm from "@/component/form/sellForm";

const Index = () => {
	const { isLoggedIn, userData } = useUser();

	const onSubmit = () => {
		try {
			console.log(userData);
			if (userData.access_token) {
				fetcherWithToken("/protected", userData.access_token);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<button onClick={() => onSubmit()}>bt</button>
			<Modal isOpen={true} onClose={() => console.log("closed")}>
				<SellForm />
			</Modal>
		</div>
	);
};

export default Index;
