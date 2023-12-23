import type { EventDispatcher } from 'svelte';
import { ethers } from 'ethers';

type Fund = 'Fund';
type Withdraw = 'Withdraw';

export interface TxnResultEvent {
  Fund: { status: number };
  Withdraw: { status: number };
}

type TxnResult = Fund | Withdraw;

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
