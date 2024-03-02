<script lang="ts">
	import type { Fact } from "@/types/fact"
	import Tiltle from "./Tiltle.svelte"
	import Date from "../ui/Date.svelte"
	import Bubble from "../templates/Bubble.svelte"
	import { focusPin } from "@/interact/earth"
	import { currentEvent } from "@/stores/events"

    export let fact: Fact;
    export let key : number;

</script>

<Bubble class={`card ${$currentEvent === fact.id ? "selected" : ""}`} on:click={() => focusPin(fact.id)}>
    <Tiltle> {fact.title} </Tiltle>
    <div class="info">
        <span class="pin">{key}</span>
        <span class="icon-pin address"> {fact.country?.name || ""} </span>
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
        gap: 30px

    .address
        text-transform: uppercase

    .pin
        all: unset
        background: var(--stress-color)
        border-radius: 50%
        display: inline-block
        padding: 5px 10px
        color: white

    :global(.card.selected)
        border: 2px solid var(--stress-color)

</style>