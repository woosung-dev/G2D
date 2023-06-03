import axios from "axios";

export default axios.create({
	baseURL: process.env.BASEURL ?? "https://startail12-api.cpslab.or.kr",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
	withCredentials: true,
});
