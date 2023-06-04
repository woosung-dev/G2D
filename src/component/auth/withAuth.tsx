import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
 * @param Component 컴포넌트가 들어가는 위치
 * @returns auth통과 여부 통과시 컴포넌트를 반환
 */
const WithAuth = (Component: any) => {
	const AuthenticatedComponent = (props: any) => {
		const { isLoggedIn, userData } = useUser();
		const [isAuth, setIsAuth] = useState(false);
		const router = useRouter();

		useEffect(() => {
			const getUser = async () => {
				try {
					// 전역상태가 로그인이 아닐 때
					if (!isLoggedIn) {
						// const { data } = await request<any>("GET", "/myinfo");
						// if (data) setIsAuth(true);
						setIsAuth(false);
						router.push("/login");
					} else {
						setIsAuth(true);
					}
				} catch (error) {
					console.log("error", error);
				}
			};
			getUser();
		}, [isLoggedIn, router]);

		return isAuth ? <Component {...props} /> : null; // Render whatever you want while the authentication occurs
	};

	return AuthenticatedComponent;
};

export default WithAuth;
