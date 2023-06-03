// @flow
import useUser from "@/hooks/useUser";
import { fetcherWithToken } from "@/util/request";
import * as React from "react";
import Modal from "@/component/modal";
import SellForm from "@/component/form/sellForm";
import axios from "axios";
import axiosUtil from "@/util/axios.util";
import { getCookie } from "@/util/cookie.util";

const Index = () => {
	const { isLoggedIn, userData } = useUser();

	const onSubmit = async () => {
		try {
			console.log(userData);
			if (userData.access_token) {
				fetcherWithToken("/protected", userData.access_token);
			} else {
				const { data } = await axios.get(
					"https://startail12-api.cpslab.or.kr/protected2",
					{
						withCredentials: true,
					},
				);
				console.log(data);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<button onClick={() => onSubmit()}>bt</button>
			{/* <Modal isOpen={true} onClose={() => console.log("closed")}>
				<SellForm />
			</Modal> */}
			{JSON.stringify(userData)}
			<br />
			{JSON.stringify(getCookie("access_token"))}
		</div>
	);
};

export default Index;
