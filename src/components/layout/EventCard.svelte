<script lang="ts">
	import type { Chronicle } from "@/types/chronicle"
	import Card from "./Card.svelte"
	import { formatDateToHTMLDateTime } from "@/lib/date"
	import { createEventDispatcher } from "svelte"

    export let event : Chronicle
    export let selected : boolean = false
    export let isFocus: boolean = false
    const dispatch = createEventDispatcher()

</script>

<Card title={event.title} selected={selected} focus={isFocus}>
    <time datetime={formatDateToHTMLDateTime(event.date)}>
        {event.date.toLocaleDateString()}
    </time>
    {#if (event.country)} <p class="country-name">📍{event.country.name}</p> {/if}
    <p>{event.description}</p>
    <button class="glass" slot="controls" on:click={() => dispatch('setFocus')}> 🔍 </button>
</Card>

<style lang="sass">
    time
        background: linear-gradient(to right, #1fa2ff, #12d8fa, #a6ffcb)
        -webkit-background-clip: text
        -webkit-text-fill-color: transparent
        font-weight: bold
</style>
