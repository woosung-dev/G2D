/* eslint-disable */
// /** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
	images: {
		domains: ['startail12-api.cpslab.or.kr']
	},
	reactStrictMode: true,
	swcMinify: true,
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
	},
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				// TODO: 임시 원격 서버로 연결하기 위한 설정 이후 배포 서버별 주소 설정 되도록 변경
				destination: "https://startail12-api.cpslab.or.kr/:path*",
			},
		];
	},
	proxyTimeout: 99000,
};

module.exports = nextConfig;
