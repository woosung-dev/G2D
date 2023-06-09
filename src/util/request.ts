import axios, { AxiosError, AxiosPromise, AxiosRequestConfig } from "axios";

type RequestMethod = "GET" | "POST" | "DELETE" | "PUT";

// 오리진
const ORIGIN = "https://startail12-api.cpslab.or.kr";

/**
 * axios를 한번 감싼 메소드
 * @param method
 * @param route
 * @param option
 * @returns
 */
export function request<T>(
	method: RequestMethod,
	route: string,
	option?: AxiosRequestConfig,
): AxiosPromise<T> {
	return axios(`${ORIGIN}${route}`, {
		method,
		...option,
	})
		.then((value) => {
			return value.data;
		}) // axios data 감싸는 부분 제거
		.catch((error: AxiosError) => {
			if (error.response?.status === 401) {
				throw error.response;
			}
		});
}

/**
 * 요청 주소 와 token을 요청하는 메소드 토큰이 필요한 요청에 한해서 사용할 수 있음
 * @param url
 * @param token
 * @returns
 */
export const fetcherWithToken = (url: string, token: string) =>
	axios
		.get(`${ORIGIN}${url}`, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => res.data);
