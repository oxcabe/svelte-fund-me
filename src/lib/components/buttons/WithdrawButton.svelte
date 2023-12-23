<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { ethers } from 'ethers';
  import { toast } from 'svelte-french-toast';

  import { emitTxnResultEvent, type TxnResultEvent } from '../../utils';

  export let fundMeContract: ethers.Contract;

  const dispatch = createEventDispatcher<TxnResultEvent>();

  let showConfirm = false;
  export let disabled = false;

  function toggleConfirm() {
    showConfirm = !showConfirm;
  }

  function withdraw() {
    fundMeContract
      .withdraw()
      .then((res) => {
        toast.success('Withdraw transaction successfully sent!');
        emitTxnResultEvent(res, dispatch, 'Withdraw');
      })
      .catch((err) => {
        toast.error('Withdraw transaction failed! Check error in console.');
        console.error(err);
      });
  }
</script>

{#if showConfirm}
  <button
    {disabled}
    id="confirm-withdraw"
    on:click={() => {
      toggleConfirm();
      withdraw();
    }}>Confirm?</button
  >
{:else}
  <button {disabled} on:click={toggleConfirm}>Withdraw</button>
{/if}

<style>
  button {
    width: 100%;
  }
  #confirm-withdraw {
    background-color: green;
  }
</style>
