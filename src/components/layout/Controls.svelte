<script lang="ts">
	import { goto } from "$app/navigation"
	import { MAXYEAR, MINYEAR, year } from "@/stores/date"
	import Control from "../ui/Control.svelte"
	import { increaseDecade } from "@/interact/navigation"
	import TimeLine from "../search/TimeLine.svelte"
	import { pauseHistory, playHistory } from "@/interact/play"
	import { addLike, getFavoriteYears, isFavorite } from "@/interact/user"
	import { page } from "$app/stores"
	import Like from "../controls/Like.svelte"

    let playing = false

    const play = () => {
        playing = true;
        playHistory()
    }
    const pause = () => {
        playing = false
        pauseHistory()
    }

    const shuffle = () => {
        const randomYear = Math.floor(Math.random() * (MAXYEAR - MINYEAR + 1) + MINYEAR);
        goto(`${randomYear}`);
    }

</script>
<div id="controls">
    <Control type="shuffle" on:click={shuffle} title="Random year!"/>
    <Control type="backward" on:click={() => increaseDecade(-1)} title="Go back 10 years"/>
    <Control type={playing ? "pause" : "play"} on:click={playing ? pause : play} title={playing ? "Let's stop here" : "Play automatically"}/>
    <Control type="forward" on:click={() => increaseDecade(1)} title="Go forward 10 years"/>
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
        padding-bottom: 20px
        width: 100%
        max-width: 100vw
        gap: 1rem
        background: var(--background-color)
</style>