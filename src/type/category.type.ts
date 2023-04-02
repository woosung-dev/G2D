export interface RecommendType {
	recommend: string;
	detail: {
		[dt: string]: {
			prompt: string;
			detail: string;
		};
	};
}
