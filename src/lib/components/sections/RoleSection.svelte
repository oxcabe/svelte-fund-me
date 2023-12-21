<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { ethers, formatEther } from 'ethers';

	import { FundingState, FundingStateToEmoji } from '../../funding';
	import { type TxnResultEvent, emitTxnResultEvent } from '../../utils';

	export let ethersProvider: ethers.BrowserProvider;
	export let fundMeContract: ethers.Contract;

	const dispatch = createEventDispatcher<TxnResultEvent>();
	let fundingState: FundingState;
	let fundedAmount: string;

	async function getFundingState() {
		const contractOwner = await fundMeContract.getOwner();
		const walletAddress = (await ethersProvider.getSigner()).address;

		fundedAmount = formatEther(await fundMeContract.getAddressToAmountFunded(walletAddress));

		if (contractOwner.toLowerCase() === walletAddress.toLowerCase()) {
			fundingState = FundingState.Owner;
		} else if (Number(fundedAmount) > 0) {
			fundingState = FundingState.Funder;
		} else {
			fundingState = FundingState.Visitor;
		}
	}

	async function withdraw() {
		fundMeContract
			.withdraw()
			.then((res) => {
				emitTxnResultEvent(res, dispatch, 'WithdrawTxnResult');
			})
			.catch((err) => {
				console.error(err);
			});
	}

	onMount(async () => {
		await getFundingState();
	});
</script>

<section>
	{#if fundingState}
		<div class="inline">
			<div>
				<h3>Funding state:</h3>
				<h3>{fundingState} {FundingStateToEmoji[fundingState]}</h3>
			</div>
			{#if fundingState === FundingState.Owner}
				<button on:click={withdraw}>Withdraw</button>
			{:else if fundingState === FundingState.Funder}
				<p>You have funded: {fundedAmount} ETH</p>
			{/if}
		</div>
	{:else}
		<p>Loading funding status...</p>
	{/if}
</section>

<style>
	.inline {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 13vh;
	}
	.inline div {
		display: flex;
	}
	.inline h3 {
		margin: 5px;
	}

	.inline button {
		width: 100%;
	}
</style>
