import Layout from "@/component/layout";
import { ThemeProvider } from "next-themes";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import wrapper from "../store";
import { useEffect } from "react";
import useUser from "@/hooks/useUser";
import { fetcherWithToken } from "@/util/request";
import { getCookie } from "@/util/cookie.util";

function MyApp({ Component, pageProps }: AppProps) {
	const { isLoggedIn, userData, login } = useUser();
	useEffect(() => {
		getToken();
	}, []);

	const getToken = async () => {
		try {
			if (!isLoggedIn || userData) {
				const data = await fetcherWithToken(
					"/token",
					getCookie("access_token"),
				);
				login({ access_token: getCookie("access_token"), email: data.email });
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<ThemeProvider attribute="class">
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ThemeProvider>
	);
}

export default wrapper.withRedux(MyApp);
