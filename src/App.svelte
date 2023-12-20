<script lang="ts">
    import { ethers } from "ethers";
    import type { SDKProvider } from "@metamask/sdk";

    import ConnectButton from "./lib/components/buttons/ConnectButton.svelte";
    import BalanceSection from "./lib/components/sections/BalanceSection.svelte";
    import FundSection from "./lib/components/sections/FundSection.svelte";
    import RoleSection from "./lib/components/sections/RoleSection.svelte";

    import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./lib/constants";

    import EthereumSvg from "/ethereum.svg";
    import SvelteSvg from "/svelte.svg";

    let connectProvider: SDKProvider;
    let ethersProvider: ethers.BrowserProvider;
    let fundMeContract: ethers.Contract;

    let walletAddress = "";

    async function setup() {
        ethersProvider = new ethers.BrowserProvider(connectProvider);
        const signer = await ethersProvider.getSigner();

        fundMeContract = new ethers.Contract(
            CONTRACT_ADDRESS, CONTRACT_ABI, signer
        );
    }

    $: walletAddress && setup();
</script>

<main>
  <header>
    <h1>🙌 FundMe 🪙</h1>
    <h3>Web3 Crowdfunding Platform</h3>
  </header>

  <ConnectButton bind:connectProvider bind:walletAddress />

  {#if ethersProvider && fundMeContract}
    <section>
        <BalanceSection {ethersProvider} />
        <FundSection {ethersProvider} {fundMeContract} />
        <RoleSection {ethersProvider} {fundMeContract} />
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

    padding: 72px 128px 16px 128px;

    background-color: #242424;
    box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2);
    border-radius: 8px;
  }

  section {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 20vh;
    margin: 8px auto;
  }

  footer {
    display: flex;
    justify-content: center;
    margin-top: 24px;
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
