<script lang="ts">
	import type { Fact } from "@/types/fact"
	import Tiltle from "./Tiltle.svelte"
	import Date from "../ui/Date.svelte"
	import Bubble from "../templates/Bubble.svelte"
	import { focusPin } from "@/interact/earth"
	import { currentEvent } from "@/stores/events"
	import type { Country } from "@/types/country"

    export let fact: Fact;

    const generatePlaceName = (fact: Fact) => {
        let placeName = "";
        if(fact.placeName) {
            placeName += fact.placeName
        }
        if(fact.placeName && fact.country) {
            placeName += ", "
        }
        return placeName;
    }

</script>

<Bubble class={`card ${$currentEvent === fact.id ? "selected" : ""}`} on:click={() => focusPin(fact.id)}>
    <Tiltle> {fact.title} </Tiltle>
    <div class="info">
        <span class="icon-pin address"> {generatePlaceName(fact)} <span class="country">{fact.country?.label}</span> </span>
        <Date class="icon-calendar" from={fact.date}/>
    </div>
    <p>
        {fact.description}
    </p>
</Bubble>

<style lang="sass">
    .info
        display: flex
        flex-wrap: wrap
        align-items: center
        gap: 0 1rem

    .address
        display: inline-flex
        gap: .5rem

    :global(.card.selected)
        border: 2px solid var(--highlight-color)
    
    :global(.bubble)
        &:hover
            cursor: pointer

</style>