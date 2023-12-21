<script lang="ts">
	import { ethers } from 'ethers';
	export let fundMeContract: ethers.Contract;

	let fundAmount = '0.01';

	async function fund() {
		fundMeContract
			.fund({ value: ethers.parseEther(fundAmount) })
			.then(() => {
				console.log('funded!');
				// TODO: Trigger getBalance update
			})
			.catch((err) => {
				console.error(err);
			});
	}
</script>

<section>
	<input
		min="0.01"
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
