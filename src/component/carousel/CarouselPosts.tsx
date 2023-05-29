import MultiCarousel from "./MultiCarousel";
import PostCard from "./PostCard";

type Props = {
	category: string;
	data: any[];
};
export default function CarouselPosts({ category, data }: Props) {
	return (
		<section className="my-4">
			<h2 className="my-2 text-2xl font-bold">{category}</h2>
			<hr />
			<MultiCarousel>
				{data.map((d, index) => (
					<PostCard key={d?.id ?? index} post={d} />
				))}
			</MultiCarousel>
		</section>
	);
}
