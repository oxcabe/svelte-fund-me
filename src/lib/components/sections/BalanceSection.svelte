<script lang="ts">
  import { onMount } from 'svelte';
  import { ethers, formatEther } from 'ethers';
  import { CONTRACT_ADDRESS } from '../../constants';
  import { crowdfundedBalance } from '../../store';

  export let ethersProvider: ethers.BrowserProvider;

  let crowdfundedBalanceValue = '';
  let isReloadDisabled = false;

  export const getCrowdfundedBalance = async () => {
    crowdfundedBalanceValue = formatEther(await ethersProvider.getBalance(CONTRACT_ADDRESS));
    crowdfundedBalance.update(() => crowdfundedBalanceValue);
    isReloadDisabled = true;

    setInterval(() => {
      isReloadDisabled = false;
    }, 3000);
  };

  onMount(async () => {
    await getCrowdfundedBalance();
  });
</script>

<section>
  {#if crowdfundedBalance}
    <div class="inline">
      <h3>Total funded:</h3>
      <h3>{crowdfundedBalanceValue} ETH</h3>
      <button disabled={isReloadDisabled} on:click={getCrowdfundedBalance}>↻</button>
    </div>
  {:else}
    <p>Retrieving balance...</p>
  {/if}
</section>

<style>
  .inline {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .inline * {
    margin: auto 6px;
  }

  .inline h3 {
    white-space: nowrap;
  }
</style>
