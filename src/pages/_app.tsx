import Layout from "@/component/layout";
import { ThemeProvider } from "next-themes";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import wrapper from "../store";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider attribute="class">
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ThemeProvider>
	);
}

export default wrapper.withRedux(MyApp);
