<script lang="ts">
  import { ethers } from 'ethers';
  import type { SDKProvider } from '@metamask/sdk';
  import { Toaster, toast } from 'svelte-french-toast';

  import ConnectButton from './lib/components/buttons/ConnectButton.svelte';
  import BalanceSection from './lib/components/sections/BalanceSection.svelte';
  import FundSection from './lib/components/sections/FundSection.svelte';
  import RoleSection from './lib/components/sections/RoleSection.svelte';

  import { CONTRACT_ABI, CONTRACT_ADDRESS } from './lib/constants';

  import EthereumSvg from '/ethereum.svg';
  import SvelteSvg from '/svelte.svg';

  let balanceSection: BalanceSection;

  let connectProvider: SDKProvider;
  let ethersProvider: ethers.BrowserProvider;
  let fundMeContract: ethers.Contract;

  let walletAddress = '';

  async function setup() {
    ethersProvider = new ethers.BrowserProvider(connectProvider);
    const signer = await ethersProvider.getSigner();

    fundMeContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  }

  function handleTxnResultEvent(e: CustomEvent<{ status: number }>) {
    toast.success(`${e.type} transaction confirmed!`);

    if (e.detail.status > 0) {
      balanceSection.getCrowdfundedBalance();
    }
  }

  $: walletAddress && setup();
</script>

<main>
  <header>
    <h1>🙌 FundMe 🪙</h1>
    <h3>Web3 Crowdfunding Platform</h3>
  </header>

  <ConnectButton bind:connectProvider bind:walletAddress />

  {#if walletAddress && ethersProvider && fundMeContract}
    <section>
      <div id="balance">
        <BalanceSection bind:this={balanceSection} {ethersProvider} />
      </div>
      <div id="contract-interactions">
        <div><FundSection {fundMeContract} on:Fund={handleTxnResultEvent} /></div>
        <div class="splitter"></div>
        <div>
          <RoleSection {ethersProvider} {fundMeContract} on:Withdraw={handleTxnResultEvent} />
        </div>
      </div>
    </section>
  {/if}

  <footer>
    <p>Powered by</p>
    <p>
      <img class="tech-logo" src={EthereumSvg} alt="Ethereum Logo" />
    </p>
    <p>Ethereum and</p>
    <img class="tech-logo" src={SvelteSvg} alt="Svelte Logo" />
    <p>Svelte.</p>
  </footer>

  <Toaster />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    text-align: center;
    min-width: 15vw;
    padding: 72px 128px 16px 128px;
    background-color: #242424;
    box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, 0.2);
    border-radius: 8px;
  }

  section {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    height: 25vh;
    margin: 8px auto;
  }

  footer {
    display: flex;
    justify-content: center;
    margin-top: 64px;
    color: #888;
    font-size: 14px;
    white-space: nowrap;
  }

  .tech-logo {
    width: 15px;
    padding-left: 10px;
    padding-right: 5px;
    vertical-align: top;
    position: relative;
    bottom: 0.15em;
  }

  .splitter {
    background-color: rgb(133, 133, 133);
    max-width: 1px;
    width: 1px;
    height: 100%;
  }

  #contract-interactions {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  @media (max-width: 830px) {
    main {
      padding: 36px 32px 8px 32px;
      max-width: 80vw;
    }

    section {
      height: 35vh;
    }

    #contract-interactions {
      flex-direction: column;
    }
  }
</style>
