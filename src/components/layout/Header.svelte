<script lang="ts">
	import { calendarType, convertYear, getYear } from "@/stores/date"
	import Help from "../ui/Help.svelte"
	import { year } from "@/stores/date"
    import WheelButton from "../ui/WheelButton.svelte"
	import { isSearchOpen } from "@/interact/commands"

    let yearWithFormat: string;

    $: {
        yearWithFormat = convertYear($year);
        $calendarType;
    }

</script>

<header id="welcome">
	<h1>This is <button id="year" on:click={() => isSearchOpen.set(true)}> {yearWithFormat} </button>!</h1>
    <p class="undertitle italic">Go through history like a good playlist</p>
    <p> 
        For now, the events displayed are in the decade before and after the year chosen.
    </p>
    <Help/>
    <WheelButton/>
</header>

<style lang="sass">
    #welcome
        display: flex
        flex-direction: column
        justify-content: center
        padding: 2rem
    h1
        font-size: 2.5rem
        font-weight: normal
        margin: 1rem 0

    .undertitle
        font-size: 1.2rem
        margin: 0

    .overtitle
        text-transform: uppercase
        

    #year
        all: unset
        color: var(--highlight-color)
        &:hover
            cursor: pointer
            text-decoration: 1px solid var(--highlight-color)
            text-underline-offset: 10px
</style>
