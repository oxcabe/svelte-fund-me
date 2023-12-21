<script lang="ts">
	import { onMount } from 'svelte';
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
			return accountsResponse[0];
		}
		return '';
	}

	function connectToMetamask() {
		connectProvider
			.request({ method: 'eth_requestAccounts', params: [] })
			.then((requestedAccounts) => {
				walletAddress = setWalletAddress(requestedAccounts);
			})
			.catch((err) => {
				console.error(err);
				return;
			});

		// Add listener for disconnection
		connectProvider.on('accountsChanged', (changedAccounts) => {
			walletAddress = setWalletAddress(changedAccounts);
		});
	}

	onMount(async () => {
		await MMSDK.init();

		connectProvider = MMSDK.getProvider();

		const chainId = Number(connectProvider.chainId);
		chainName = CHAIN_NAMES[chainId as keyof typeof CHAIN_NAMES];
	});
</script>

{#await MMSDK.init() then}
	{#if walletAddress}
		<button>🟢 Connected to {chainName} | {walletAddress}</button>
	{:else if connectProvider}
		<button on:click={connectToMetamask}>🔴 Connect</button>
	{/if}
{/await}
