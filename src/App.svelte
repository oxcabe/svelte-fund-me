<script lang="ts">
    import { ethers, formatEther } from "ethers";
    import type { SDKProvider } from "@metamask/sdk";

    import ConnectButton from "./lib/components/ConnectButton.svelte";
    import FundSection from "./lib/components/FundSection.svelte";
    import WithdrawButton from "./lib/components/WithdrawButton.svelte";

    import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./lib/constants";

    import EthereumSvg from "/ethereum.svg";
    import SvelteSvg from "/svelte.svg";

    let connectProvider: SDKProvider;
    let ethersProvider: ethers.BrowserProvider;

    let fundMeContract: ethers.Contract;

    let walletAddress = "";
    let crowdfundedBalance = "";

    async function setUp() {
        ethersProvider = new ethers.BrowserProvider(connectProvider);
        const signer = await ethersProvider.getSigner();

        fundMeContract = new ethers.Contract(
            CONTRACT_ADDRESS, CONTRACT_ABI, signer
        );
    }

    async function getBalance() {
        crowdfundedBalance = formatEther(
            await ethersProvider.getBalance(CONTRACT_ADDRESS)
        );
    }

    $: walletAddress && setUp();
    $: ethersProvider && getBalance();
</script>

<main>
  <header>
    <h1>🙌 FundMe 🪙</h1>
    <h3>Web3 Crowdfunding Platform</h3>
  </header>

  <ConnectButton bind:connectProvider bind:walletAddress />

  {#if walletAddress}
    <section>
        <div>
            {#if crowdfundedBalance}
                <p>Balance: {crowdfundedBalance} ETH</p>
            {:else}
                <p>Retrieving balance...</p>
            {/if}
            <!-- TODO: Only show withdraw button for contract owner -->
            <WithdrawButton />
        </div>

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

    padding: 72px 128px 16px 128px;

    background-color: #242424;
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