<script lang="ts">
    export let walletInfo: object;

    function connectToMetamask() {}
</script>

{#if walletInfo}
    <button>🟢 Connected | {walletInfo}</button>
{:else}
    <button>🔴 Connect</button>
{/if}