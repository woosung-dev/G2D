import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 1,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 1,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
	},
};

type Props = {
	children: React.ReactNode;
};
export default function OnePointCarousel({ children }: Props) {
	return (
		<Carousel
			infinite
			responsive={responsive}
			itemClass="m-2"
			className="flex w-auto"
		>
			{children}
		</Carousel>
	);
}
