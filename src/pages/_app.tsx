import Layout from "@/component/layout";
import { ThemeProvider } from "next-themes";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider attribute="class">
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ThemeProvider>
	);
}
