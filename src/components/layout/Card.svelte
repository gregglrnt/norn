<script lang="ts">
	import type { Fact } from "@/types/fact"
	import Tiltle from "./Tiltle.svelte"
	import Date from "../ui/Date.svelte"
	import Bubble from "../templates/Bubble.svelte"
	import { focusOnPinSphere } from "@/animation/rendering"

    export let fact: Fact;
    export let position: number;
    export let total: number;
    let classNames: string = "";
    export {classNames as class}

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

<div class={`card ${classNames}`}>
    <span class="card-position">{position + 1} / {total}</span>
    <Tiltle variant='stress'> {fact.title} </Tiltle>
    <Bubble>
    <div class="info">
        <span class="icon-pin address"> {generatePlaceName(fact)} <span class="country">{fact.country?.label}</span> </span>
        <Date class="icon-calendar" from={fact.date}/>
    </div>
    <p>
        {fact.description}
    </p>
    <button class="focus-btn" aria-label={`Focus ${fact.title} on sphere`} on:click={() => focusOnPinSphere(fact.id)}></button>
    </Bubble>
</div>

<style lang="sass">
:global(.card)
    gap: 0.5rem
    // position: absolute
    width: 95%
    max-width: 100%
    visibility: hidden

:global(.card.focus)
    visibility: visible

.info
    display: flex
    flex-wrap: wrap
    align-items: center
    gap: 0 1rem

.address
    display: inline-flex
    gap: .5rem

:global(.bubble)
    &:hover
        cursor: pointer

.focus-btn
    background: var(--highlight-color)
    align-self: flex-end
    padding: 0.5rem 
    border-radius: 50%
    &:before
        content: url("/svg/focus.svg")
        object-position: center
        display: block
        height: 1rem
        width: 1rem
    &:hover
        background: var(--stress-color)

.card-position
    font-size: 0.7rem
    text-align: right
</style>