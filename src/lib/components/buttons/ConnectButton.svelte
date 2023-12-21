<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { MetaMaskSDK, SDKProvider } from '@metamask/sdk';

	import { CHAIN_NAMES } from '../../constants';

	export let walletAddress = '';

	let chainName = '';

	const MMSDK = new MetaMaskSDK({
		dappMetadata: {
			name: document.title
		},
		enableDebug: false,
		extensionOnly: true
	});

	export let connectProvider: SDKProvider;

	function setWalletAddress(accountsResponse: string[] | unknown) {
		if (Array.isArray(accountsResponse) && accountsResponse.length > 0) {
			walletAddress = accountsResponse[0];
		} else {
			walletAddress = '';
		}
	}

	function connectToMetamask() {
		connectProvider
			.request({ method: 'eth_requestAccounts', params: [] })
			.then(setWalletAddress)
			.catch((err) => {
				console.error(err);
				return;
			});

		// Add listener for disconnection
		connectProvider.on('accountsChanged', setWalletAddress);
	}

	onMount(async () => {
		await MMSDK.init();

		connectProvider = MMSDK.getProvider();

		const chainId = Number(connectProvider.chainId);
		chainName = CHAIN_NAMES[chainId as keyof typeof CHAIN_NAMES];
	});

	onDestroy(() => {
		connectProvider.removeListener('accountsChanged', setWalletAddress);
	});
</script>

{#await MMSDK.init() then}
	{#if walletAddress}
		<button>🟢 Connected to {chainName} | {walletAddress}</button>
	{:else if connectProvider}
		<button on:click={connectToMetamask}>🔴 Connect</button>
	{/if}
{/await}
