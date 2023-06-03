import Layout from "@/component/layout";
import { ThemeProvider } from "next-themes";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import wrapper from "../store";
import { useEffect } from "react";
import useUser from "@/hooks/useUser";
import axios from "axios";

function MyApp({ Component, pageProps }: AppProps) {
	const { isLoggedIn, userData, login } = useUser();
	useEffect(() => {
		getToken();
	});

	const getToken = async () => {
		try {
			if (!isLoggedIn) {
				const { data } = await axios.get(
					`https://startail12-api.cpslab.or.kr/token`,
				);
				login(data);
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
