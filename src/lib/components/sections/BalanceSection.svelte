<script lang="ts">
  import { onMount } from 'svelte';
  import { ethers, formatEther } from 'ethers';
  import { CONTRACT_ADDRESS } from '../../constants';

  export let ethersProvider: ethers.BrowserProvider;

  let crowdfundedBalance = '';

  export const getCrowdfundedBalance = async () => {
    crowdfundedBalance = formatEther(await ethersProvider.getBalance(CONTRACT_ADDRESS));
  };

  onMount(async () => {
    await getCrowdfundedBalance();
  });
</script>

<section>
  {#if crowdfundedBalance}
    <div class="inline">
      <h3>Total funded:</h3>
      <h3>{crowdfundedBalance} ETH</h3>
      <button on:click={getCrowdfundedBalance}>↻</button>
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
