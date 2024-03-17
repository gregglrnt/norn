<script lang="ts">
	import { year } from "@/stores/date"
	import TimeLine from "../search/TimeLine.svelte"
	import Like from "../controls/Like.svelte"
	import Play from "../controls/Play.svelte"
	import Shuffle from "../controls/Shuffle.svelte"
	import Travel from "../controls/Travel.svelte"



</script>
<div id="controls">
    <Shuffle/>
    <Travel type='backward'/>
    <Play/>
    <Travel type='forward'/>
    {#key $year}
        <Like/>
    {/key}
    <TimeLine/>
</div>

<style lang="sass">
    #controls
        position: fixed
        bottom: 0
        color: white
        display: flex
        flex-wrap: wrap
        justify-content: center
        width: 100%
        max-width: 100vw
        gap: 1rem
        background: var(--background-color)
</style>