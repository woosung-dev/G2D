import Image from "next/image";
import React from "react";
import Avatar from "../../../public/avatar.png";
import { removeCookie } from "@/util/cookie.util";
type Props = {
	email: string;
};
const HeroProfile = (props: Props) => {
	return (
		<section className="text-center">
			<Image
				className="mx-auto rounded-full"
				src={Avatar}
				alt="Picture of the author"
				width={250}
				height={250}
				priority
			/>
			<h2 className="mt-2 text-2xl font-bold">{props.email}</h2>
			<span>
				<a href="/">
					<button
						className="px-4 py-2 my-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
						onClick={() => removeCookie("access_token")}
					>
						logout
					</button>
				</a>
			</span>
		</section>
	);
};

export default HeroProfile;
