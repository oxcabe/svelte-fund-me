<script lang="ts">
	import { ethers } from 'ethers';
	// export let ethersProvider: ethers.BrowserProvider;
	// export let fundMeContract: ethers.Contract;
</script>

<section>
	<input placeholder="Amount (in ETH)" type="text" name="amount in ETH" />
	<button>Fund</button>
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
