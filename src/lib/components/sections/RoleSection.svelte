<script lang="ts">
    import { onMount } from "svelte";
    import { ethers, formatEther } from "ethers";
    import { CONTRACT_ADDRESS } from "../../constants";
    import { FundingState, FundingStateToEmoji } from "../../funding";
    import WithdrawButton from "../buttons/WithdrawButton.svelte";

    export let ethersProvider: ethers.BrowserProvider;
    export let fundMeContract: ethers.Contract;

    let crowdfundedBalance = "";
    let fundingState: FundingState;

    async function getCrowdfundedBalance() {
        crowdfundedBalance = formatEther(
            await ethersProvider.getBalance(CONTRACT_ADDRESS)
        );
    };

    async function getFundingState() {
        const contractOwner = await fundMeContract.getOwner();
        const walletAddress = (await ethersProvider.getSigner()).address;

        const fundedAmount = formatEther(
          await fundMeContract.getAddressToAmountFunded(walletAddress)
        );

        if (contractOwner.toLowerCase() === walletAddress.toLowerCase()) {
          fundingState = FundingState.Owner;
        }
        else if (Number(crowdfundedBalance) > 0) {
          fundingState = FundingState.Funder;
        }
        else {
            fundingState = FundingState.Visitor;
        }
    }

    onMount(async () => {
        await getCrowdfundedBalance();
        await getFundingState();
    });
</script>

<section>
    {#if fundingState}
        <div class="inline">
            <h3>Funding state:</h3>
            <h3>{fundingState} {FundingStateToEmoji[fundingState]}</h3>
        {#if fundingState === FundingState.Owner }
            <WithdrawButton />
        {/if}
        </div>
    {:else}
        <p>Loading funding status...</p>
    {/if}
</section>

<style>
    .inline {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .inline * {
        margin: auto 12px;
    }
</style>
