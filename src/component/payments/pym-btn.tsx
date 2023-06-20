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
/**
 * 결제 버튼 및 결제 요청 api 연동
 * props로 결제 정보를 전달받아서 결제 요청, 없을시 더미 요청
 * TODO: 추후 실결제 연동시 더미데이터 없이 결제 정보를 꼭 받아야 결제 가능하도록 변경
 */
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
