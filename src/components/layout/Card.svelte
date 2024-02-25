<script lang="ts">
	import type { Fact } from "@/types/fact"
	import Button from "../ui/Button.svelte"
	import Tiltle from "./Tiltle.svelte"
	import Date from "../ui/Date.svelte"
	import Bubble from "../templates/Bubble.svelte"

    export let fact: Fact;
    export let key : number;

</script>

<Bubble class="card">
    <Tiltle> {fact.title} </Tiltle>
    <div class="info">
        <span class="pin"> {key} </span>
        <span class="icon-pin address"> {fact.country?.name || ""} </span>
        <Date class="icon-calendar" src={fact.date}/>
    </div>
    <p>
        {fact.description}
    </p>
    <Button primary class="icon-search" title="Bring me there!" disabled>To be implemented</Button>
</Bubble>

<style lang="sass">
    .info
        display: flex
        align-items: center
        gap: 30px
    .pin
        display: inline-block
        padding: 5px 10px
        border-radius: 50%
        background: var(--stress-color)
        color: white
    .address
        text-transform: uppercase

</style>