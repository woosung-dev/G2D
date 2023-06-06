import useUser from "@/hooks/useUser";
import Login from "@/pages/login";
import { getCookie } from "@/util/cookie.util";
import { fetcherWithToken } from "@/util/request";
import { info } from "@/util/toastify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
 * @param Component 컴포넌트가 들어가는 위치
 * @returns auth통과 여부 통과시 컴포넌트를 반환
 */
const WithAuth = (Component: any) => {
	const AuthenticatedComponent = (props: any) => {
		const { isLoggedIn, userData, login } = useUser();
		const [isAuth, setIsAuth] = useState(false);
		const router = useRouter();

		useEffect(() => {
			const getUser = async () => {
				try {
					// 전역상태가 로그인이 아닐 때
					if (!isLoggedIn) {
						const data = await fetcherWithToken(
							"/token",
							getCookie("access_token"),
						);
						if (data.email) {
							login({
								access_token: getCookie("access_token"),
								email: data.email,
							});
							setIsAuth(true);
						} else {
							setIsAuth(false);
							router.push("/login");
						}
					} else {
						setIsAuth(true);
					}
				} catch (error) {
					info("Login is required");
					console.log("error", error);
					router.push("/login");
				}
			};
			getUser();
		}, [isLoggedIn, router]);

		// isAuth && router.push("/login");
		return isAuth ? <Component {...props} /> : <Login />; // Render whatever you want while the authentication occurs
	};

	return AuthenticatedComponent;
};

export default WithAuth;
