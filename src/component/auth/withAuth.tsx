import useUser from "@/hooks/useUser";
import { request } from "@/util/request";
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
					if (!isLoggedIn) {
						// redux 상태에 따라서 없을 경우
						// const { data } = await request<any>("GET", "/myinfo");
						// if (data) setIsAuth(true);
						setIsAuth(true);
					} else {
						setIsAuth(false);
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
