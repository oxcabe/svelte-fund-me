<script lang="ts">
	import { onMount } from 'svelte';
	import { ethers, formatEther } from 'ethers';
	import { CONTRACT_ADDRESS } from '../../constants';
	import { FundingState, FundingStateToEmoji } from '../../funding';
	import WithdrawButton from '../buttons/WithdrawButton.svelte';

	export let ethersProvider: ethers.BrowserProvider;

	let crowdfundedBalance = '';

	async function getCrowdfundedBalance() {
		crowdfundedBalance = formatEther(await ethersProvider.getBalance(CONTRACT_ADDRESS));
	}

	onMount(async () => {
		await getCrowdfundedBalance();
	});
</script>

<section>
	{#if crowdfundedBalance}
		<div class="inline">
			<h2>Balance:</h2>
			<h2>{crowdfundedBalance} ETH</h2>
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
</style>
