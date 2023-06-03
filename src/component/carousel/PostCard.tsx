import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

type Props = { post: any };
export default function PostCard({
	post: { title, description, date, category, path },
}: Props) {
	return (
		<Link href={`/assets/${path}`}>
			<article className="overflow-hidden rounded-md shadow-md hover:shadow-xl">
				<Image
					className="w-full"
					src={`/cat-1.jpg`}
					alt={"title"}
					width={150}
					height={150}
				/>
				<div className="flex flex-col items-center p-4">
					<time className="self-end text-gray-700">
						{date
							? dayjs(date).format("YYYY-MM-DD")
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
		</Link>
	);
}
