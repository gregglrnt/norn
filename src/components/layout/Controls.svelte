<script lang="ts">
	import { calendarType, year } from "@/stores/date"
	import TimeLine from "../search/TimeLine.svelte"
	import Like from "../controls/Like.svelte"
	import Play from "../controls/Play.svelte"
	import Shuffle from "../controls/Shuffle.svelte"
	import Travel from "../controls/Travel.svelte"
	import { era } from "@/stores/era"
</script>
<div id="controls">
    <div class="line">
        <Shuffle/>
        <Travel type='backward'/>
        <Play/>
        <Travel type='forward'/>
        {#key $year}
            <Like/>
        {/key}
    </div>
    <div class="line">
        <p class="overtitle"><span class="logo">Norn</span> - Your history broadcast <br/></p>
        <p>Currently listening on playlist: {$era}</p>
        <TimeLine/>
    </div>
</div>

<style lang="sass">
    #controls
        color: white
        max-width: 100vw
        width: 100%
        z-index: 50
        display: flex
        flex-direction: column
        gap: 1rem
        grid-area: footer

        .line 
            display: flex
            flex-wrap: wrap
            justify-content: center
            gap: 1rem
.logo
    text-transform: uppercase
    letter-spacing: 10px
    color: var(--highlight-color)
</style>