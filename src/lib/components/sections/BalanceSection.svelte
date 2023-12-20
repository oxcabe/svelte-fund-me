<script lang="ts">
    import { onMount } from "svelte";
    import { ethers, formatEther } from "ethers";
    import { CONTRACT_ADDRESS } from "../../constants";
    import WithdrawButton from "../buttons/WithdrawButton.svelte";

    export let ethersProvider: ethers.Provider;
    export let showWithdrawButton: boolean;

    let crowdfundedBalance = "";

    async function getBalance() {
        crowdfundedBalance = formatEther(
            await ethersProvider.getBalance(CONTRACT_ADDRESS)
        );
    };

    onMount(async () => {
        await getBalance();
    });
</script>

<div>
    {#if crowdfundedBalance}
        <p>Balance: {crowdfundedBalance} ETH</p>
    {:else}
        <p>Retrieving balance...</p>
    {/if}
    {#if showWithdrawButton }
        <WithdrawButton />
    {/if}
</div>
