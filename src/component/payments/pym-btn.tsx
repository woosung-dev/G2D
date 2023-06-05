// @flow
import * as React from "react";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { success } from "../../util/toastify";

type Props = {
	orderId?: string;
	orderName?: string;
	successUrl?: string;
	failureUrl?: string;
	children?: React.ReactNode;
	amount?: number;
	onSuccessFn?: () => void;
};
export const PaymentBtn = ({
	orderId,
	orderName,
	successUrl,
	failureUrl,
	children,
	amount,
	onSuccessFn,
}: Props) => {
	const handleClick = async () => {
		const tossPayments = await loadTossPayments(
			process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY ??
				"test_ck_oeqRGgYO1r5k7JpY7Oa3QnN2Eyaz",
		);

		await tossPayments.requestPayment("카드", {
			amount: amount ?? 5000,
			orderId: orderId ?? Math.random().toString(36).slice(2),
			orderName: orderName ?? "3D Object",
			successUrl: successUrl ?? `${window.location.origin}/api/payments`,
			failUrl: failureUrl ?? `${window.location.origin}/api/payments/fail`,
		});

		onSuccessFn && (await onSuccessFn());
	};
	return (
		<div>
			<div onClick={handleClick}>{children}</div>
		</div>
	);
};
