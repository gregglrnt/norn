<script lang="ts">
	import type { Fact } from "@/types/fact"
	import Tiltle from "./Tiltle.svelte"
	import Date from "../ui/Date.svelte"
	import Bubble from "../templates/Bubble.svelte"
	import { focusPin } from "@/interact/earth"
	import { currentEvent } from "@/stores/events"

    export let fact: Fact;

</script>

<Bubble class={`card ${$currentEvent === fact.id ? "selected" : ""}`} on:click={() => focusPin(fact.id)}>
    <Tiltle> {fact.title} </Tiltle>
    <div class="info">
        <span class="icon-pin address"> {fact.country?.label || ""} </span>
        <Date class="icon-calendar" src={fact.date}/>
    </div>
    <p>
        {fact.description}
    </p>
</Bubble>

<style lang="sass">
    .info
        display: flex
        align-items: center
        gap: 1rem

    .address
        text-transform: uppercase

    :global(.card.selected)
        border: 2px solid var(--highlight-color)
    
    :global(.bubble)
        &:hover
            cursor: pointer

</style>