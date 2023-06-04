import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

export interface IPostCard {
	_3d_path: any;
	ID: any;
	Image_path: any;
	category: any;
	create_time: any;
	description: any;
	downloadcount: any;
	is_sell: any;
	item_id: any;
	model_name: any;
	price: any;
	title: any;
	viewcount: any;
}

type Props = { post?: any; linkDisable?: boolean };
export default function PostCard({
	post: {
		_3d_path,
		ID,
		Image_path,
		category,
		create_time,
		description,
		downloadcount,
		is_sell,
		item_id,
		model_name,
		price,
		title,
		viewcount,
	},
	linkDisable = false,
}: Props) {
	const Article = (
		<article className="overflow-hidden border border-gray-300 rounded-md shadow-md hover:shadow-lg hover:shadow-xl dark:border-gray-200/50 dark:hover:shadow-gray-400/40">
			<Image
				className="w-full"
				src={`https://startail12-api.cpslab.or.kr/static/${Image_path}`}
				alt={title ?? "title"}
				width={150}
				height={150}
			/>
			<hr />
			<div className="flex flex-col items-center p-4">
				<time className="self-end text-gray-700">
					{create_time
						? dayjs(create_time).format("YYYY-MM-DD")
						: dayjs().format("YYYY-MM-DD")}
				</time>
				<h3 className="text-lg font-bold">{title ?? "title"}</h3>
				<p className="w-full text-center truncate">
					{description ?? "description"}
				</p>
				<span className="px-2 my-2 text-sm bg-green-100 rounded-lg">
					{category ?? "category"}
				</span>
			</div>
		</article>
	);
	return (
		<>
			{!linkDisable ? (
				<Link href={`/assets/${item_id}`}>{Article}</Link>
			) : (
				<span>{Article}</span>
			)}
		</>
	);
}
