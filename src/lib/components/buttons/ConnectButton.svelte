<script lang="ts">
    import { onMount } from "svelte";
    import { MetaMaskSDK, SDKProvider } from "@metamask/sdk";

    export let walletAddress = "";

    const MMSDK = new MetaMaskSDK({
        dappMetadata: {
            name: document.title,
        },
        enableDebug: false,
        extensionOnly: true,
    });

    export let connectProvider: SDKProvider;
    
    onMount(async () => {
        await MMSDK.init();
        connectProvider = MMSDK.getProvider();
    });

    function connectToMetamask() {
        connectProvider.request({ method: 'eth_requestAccounts', params: [] })
            .then((res) => { 
                if (Array.isArray(res) && res.length > 0) {
                    walletAddress = res[0];
                }
             })
            .catch((err) => { console.error(err); })
    }
</script>

{#await MMSDK.init() then}
{#if walletAddress}
    <button>🟢 Connected | {walletAddress}</button>
{:else if connectProvider}
    <button on:click={connectToMetamask}>🔴 Connect</button>
{/if}
{/await}