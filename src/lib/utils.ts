import type { EventDispatcher } from 'svelte';
import { ethers } from 'ethers';

type FundTxnResult = 'FundTxnResult';
type WithdrawTxnResult = 'WithdrawTxnResult';

export interface TxnResultEvent {
	FundTxnResult: { status: number };
	WithdrawTxnResult: { status: number };
}

type TxnResult = FundTxnResult | WithdrawTxnResult;

export function emitTxnResultEvent(
	response: ethers.ContractTransactionResponse,
	dispatch: EventDispatcher<TxnResultEvent>,
	eventType: TxnResult
) {
	response
		.wait()
		.then((res) => {
			if (res && typeof res.status === 'number') {
				dispatch(eventType, { status: res.status });
			}
		})
		.catch((err) => {
			console.error(err);
		});
}
