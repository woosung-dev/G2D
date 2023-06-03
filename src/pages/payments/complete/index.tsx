import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Con from "../../../../public/congraturation.png";
import Image from "next/image";

export default function PaymentsComplete() {
	const router = useRouter();
	const { orderId } = router.query;

	const secretKey =
		process.env.TOSS_SECRET_KEY || "test_sk_D4yKeq5bgrppWJ0JnLArGX0lzW6Y";
	const basicToken = Buffer.from(`${secretKey}:`, `utf-8`).toString("base64");

	const [payments, setPayments] = useState<any>();
	const [card, setCard] = useState<any>();

	useEffect(() => {
		async function getCard() {
			const url = `https://api.tosspayments.com/v1/payments/orders/${
				orderId ?? "915tlu2b9i"
			}`;
			const payments = await fetch(url, {
				headers: {
					Authorization: `Basic ${basicToken}`,
					"Content-Type": "application/json",
				},
			}).then((res) => res.json());

			return payments;
		}
		getCard().then((v) => {
			setPayments(v);
			setCard(v.card ?? {});
		});
	}, []);

	return (
		<div className="h-[calc(100vh-8em)] ">
			{payments && (
				<section className="container flex items-center justify-center flex-grow w-full h-3/4 min-h-max">
					<h1 className="mb-4 text-3xl font-medium text-gray-900 title-font sm:text-4xl">
						결제가 완료되었습니다
					</h1>
					<Image
						src={Con}
						alt={"cong"}
						width={200}
						height={200}
						className="ml-6 mr-10"
					/>
					<ul>
						<li className="mb-8 leading-relaxed">
							결제 상품 {payments.orderName}
						</li>
						<li className="mb-8 leading-relaxed">
							주문번호 {payments.orderId}{" "}
						</li>
						<li className="mb-8 leading-relaxed">카드회사 {card.company}</li>
						<li className="mb-8 leading-relaxed">카드번호 {card.number}</li>
						<li className="mb-8 leading-relaxed">결제금액 {card.amount}</li>
						<li className="mb-8 leading-relaxed">
							결제승인날짜{" "}
							{Intl.DateTimeFormat().format(
								new Date(payments.approvedAt ?? Date.now()),
							)}
						</li>
					</ul>
				</section>
			)}
			<div className="flex items-center justify-center h-1/4">
				<div className="flex items-center justify-center my-10">
					<button className="btn-project" onClick={() => router.push("/")}>
						Go Home
					</button>
				</div>
			</div>
		</div>
	);
}
