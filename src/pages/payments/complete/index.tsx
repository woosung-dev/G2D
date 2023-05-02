import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
		<div>
			{payments && (
				<>
					<h1>결제가 완료되었습니다</h1>
					<ul>
						<li>결제 상품 {payments.orderName}</li>
						<li>주문번호 {payments.orderId} </li>
						<li>카드회사 {card.company}</li>
						<li>카드번호 {card.number}</li>
						<li>결제금액 {card.amount}</li>
						<li>
							결제승인날짜{" "}
							{Intl.DateTimeFormat().format(
								new Date(payments.approvedAt ?? Date.now()),
							)}
						</li>
					</ul>
				</>
			)}
		</div>
	);
}
