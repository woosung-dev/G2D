import Image from "next/image";
import React from "react";
import Avatar from "../../../public/avatar.png";
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
		</section>
	);
};

export default HeroProfile;
