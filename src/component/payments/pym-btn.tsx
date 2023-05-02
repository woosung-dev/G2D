// @flow
import * as React from "react";
import { loadTossPayments } from "@tosspayments/payment-sdk";

type Props = {
	orderId?: string;
	orderName?: string;
	successUrl?: string;
	failureUrl?: string;
	children?: React.ReactNode;
};
export const PaymentBtn = (props: Props) => {
	const handleClick = async () => {
		const tossPayments = await loadTossPayments(
			process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY ??
				"test_ck_oeqRGgYO1r5k7JpY7Oa3QnN2Eyaz",
		);

		await tossPayments.requestPayment("카드", {
			amount: 5000,
			orderId: props.orderId ?? Math.random().toString(36).slice(2),
			orderName: props.orderName ?? "맥북",
			successUrl: props.successUrl ?? `${window.location.origin}/api/payments`,
			failUrl:
				props.failureUrl ?? `${window.location.origin}/api/payments/fail`,
		});
	};
	return (
		<div>
			<div onClick={handleClick}>{props.children}</div>
		</div>
	);
};
