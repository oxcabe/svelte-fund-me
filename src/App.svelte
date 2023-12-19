<script lang="ts">
  import ConnectButton from "./lib/components/ConnectButton.svelte";
  import FundSection from "./lib/components/FundSection.svelte";
  import WithdrawButton from "./lib/components/WithdrawButton.svelte";
</script>

<main>
  <ConnectButton />
  <button>Get balance</button>
  <WithdrawButton />

  <FundSection />

 
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    background-color: #333;
    padding: 64px;
    border: 1px solid white;
  }
</style>