<script lang="ts">
    import ConnectButton from "./lib/components/ConnectButton.svelte";
    import FundSection from "./lib/components/FundSection.svelte";
    import WithdrawButton from "./lib/components/WithdrawButton.svelte";

    import EthereumSvg from "/ethereum.svg";
    import SvelteSvg from "/svelte.svg";

    let walletAddress: string;
    let crowdfundedBalance = 0;
</script>

<main>
  <header>
    <h1>🙌 FundMe 🪙</h1>
    <h3>Web3 Crowdfunding Platform</h3>
  </header>

  <ConnectButton bind:walletAddress />

  {#if walletAddress}
    <section>
        <button>Crowdfunded balance: {crowdfundedBalance}</button>
        <WithdrawButton />

        <FundSection />
    </section>
  {/if}

  <footer>
    <p>Powered by <p>
    <img class="tech-logo" src="{EthereumSvg}" alt="Ethereum Logo">
    <p>Ethereum and</p>
    <img class="tech-logo" src="{SvelteSvg}" alt="Svelte Logo">
    <p>Svelte.</p>
  </footer>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    background-color: #242424;
    padding: 72px 128px 16px 128px;
    box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2);
    border-radius: 8px;
  }

  footer {
    display: flex;
    justify-content: center;
    margin-top: 56px;
    color: #888;
    font-size: 14px;
  }

  .tech-logo {
    width: 15px;
    padding-left: 10px;
    padding-right: 5px;
    vertical-align: top;
    position: relative;
    bottom: 0.15em;
  }
</style>