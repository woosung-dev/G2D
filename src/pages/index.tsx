import React from "react";
import Head from "next/head";
import Hero from "@/component/home/hero";

export default function Home() {
	return (
		<>
			<Head>
				<title> C2D - main </title>
				<meta name="description" content="main page" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<section className="flex flex-col items-center justify-center min-h-screen gray-600 min-fl body-font">
				<div className="container flex flex-col items-center px-5 py-24 mx-auto md:flex-row">
					<Hero />
				</div>
			</section>
		</>
	);
}
