<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ethers } from 'ethers';
  import toast from 'svelte-french-toast';

  import { MINIMUM_FUNDING_AMOUNT } from '../../constants';
  import { type TxnResultEvent, emitTxnResultEvent } from '../../utils';

  export let fundMeContract: ethers.Contract;

  const dispatch = createEventDispatcher<TxnResultEvent>();
  let fundAmount = MINIMUM_FUNDING_AMOUNT;

  async function fund() {
    fundMeContract
      .fund({ value: ethers.parseEther(fundAmount) })
      .then((res) => {
        toast.success('Fund transaction successfully sent!');
        emitTxnResultEvent(res, dispatch, 'Fund');
      })
      .catch((err) => {
        toast.error('Withdraw transaction failed! Check error in console.');
        console.error(err);
      });
  }
</script>

<section>
  <input
    min={MINIMUM_FUNDING_AMOUNT}
    bind:value={fundAmount}
    placeholder="Amount (in ETH)"
    type="text"
    name="amount in ETH"
  />
  <button on:click={fund}>Fund</button>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  input {
    text-align: center;
    font-weight: bold;
    font-size: 1em;
    height: 32px;
  }
  button {
    width: 100%;
  }
</style>
