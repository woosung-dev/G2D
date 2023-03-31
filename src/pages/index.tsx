import React from "react";
import style from "../styles/temp.module.scss";
import Image from "next/image";
import catSrc from "../../public/cat-1.jpg";
import dogSrc from "../../public/dog-1.jpg";
import Link from "next/link";

export default function Home() {
	return (
		<>
			{/* Slider 메뉴 */}
			<div className={style["slider-wrapper"]}>
				<span className={style["slider-title"]}>{cat2}</span>
				<div className={style["slider-description"]}>
					<Image
						src={catSrc}
						alt="Picture of the cat"
						width={500}
						height={500}
						placeholder="blur"
					/>
				</div>
			</div>
			{/* Category + Skeleton 처리 */}
			<div className={style["category-layout-wrapper"]}>
				{TempData.map((v, index) => (
					// container 각각 하나하나
					<div
						className={style["category-wrapper"]}
						key={`category-wrapper-${index}`}
					>
						<div className={style["category-title"]}>
							<Link href="/chat-text">
								{v.category} {">"}
							</Link>
						</div>
						<div className={style["category-items"]}>
							{v.data.map((d, index) => (
								<div className={style["category-item"]} key={`item-${index}`}>
									<div className="">
										<Image
											src={dogSrc}
											alt="Picture of the dog"
											width={250}
											height={250}
											placeholder="blur"
										/>
									</div>
									<div>{d.name}</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</>
	);
}

const cat2 =
	"Cats are fascinating creatures that have been beloved companions of humans for thousands of years, and their greatness can be attributed to their incredible agility, grace, and beauty, as well as their independent nature, intelligence, and loyalty to their owners. They have the ability to jump up to six times their body length and land on their feet with incredible accuracy, which is a testament to their exceptional agility and reflexes. Additionally, their sleek and soft fur, vibrant eyes, and unique markings make them aesthetically pleasing to the eye and a joy to look at. Moreover, cats have a reputation for being independent and self-sufficient creatures, which makes them easy to care for and perfect for people who live busy lives. They are intelligent animals that can be trained to do tricks, and their affectionate nature makes them loyal companions to their owners. Cats are also known for their healing powers, as the act of petting a cat can reduce stress levels and lower blood pressure. Furthermore, owning a cat has been linked to a decreased risk of heart attacks and strokes.";

// getStaticprops is used to (category별 n가지씩 가져오도록 요청)
export const TempData = [
	{
		category: "Featured",
		data: [
			{ name: "one" },
			{ name: "two" },
			{ name: "three" },
			{ name: "four" },
			{ name: "five" },
			{ name: "six" },
		],
	},
	{
		category: "Hottest",
		data: [
			{ name: "one" },
			{ name: "two" },
			{ name: "three" },
			{ name: "four" },
			{ name: "five" },
			{ name: "six" },
		],
	},
	{
		category: "Newest",
		data: [
			{ name: "one" },
			{ name: "two" },
			{ name: "three" },
			{ name: "four" },
			{ name: "five" },
			{ name: "six" },
		],
	},
	{
		category: "Featured",
		data: [
			{ name: "one" },
			{ name: "two" },
			{ name: "three" },
			{ name: "four" },
			{ name: "five" },
			{ name: "six" },
		],
	},
	{
		category: "Most Popular Prompts This Week Explore All",
		data: [
			{ name: "one" },
			{ name: "two" },
			{ name: "three" },
			{ name: "four" },
			{ name: "five" },
			{ name: "six" },
		],
	},
	{
		category: "Most Popular Prompts This Month",
		data: [
			{ name: "one" },
			{ name: "two" },
			{ name: "three" },
			{ name: "four" },
			{ name: "five" },
			{ name: "six" },
		],
	},
];
