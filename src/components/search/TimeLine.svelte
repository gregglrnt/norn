<script lang="ts">
	import { goto } from "$app/navigation"
	import { page } from "$app/stores"
	import { MAXYEAR, MINYEAR } from "@/stores/date"
	import { derived } from "svelte/store"

    //TODO: improve accessibility

    const timeLength = Math.abs(MAXYEAR) + Math.abs(MINYEAR)
    const width = derived(page, ($page) => (parseInt($page.data.year) + Math.abs(MINYEAR)) / timeLength)

    const updateTimeLine = (e : MouseEvent) => {
        const {clientX, currentTarget} = e;
        const width = (currentTarget as HTMLDivElement).clientWidth + 20; //FIXME: why +20? 
        const percentage = clientX / width; 
        const newYear = Math.floor((percentage * timeLength) + MINYEAR);
        goto(`/${newYear}`)
    }


</script>

<div class="time-line" on:click|preventDefault={updateTimeLine}>
    <div class="time-line-bar">
        <div class="time-line-counter" style={`width: ${$width * 100}%`}></div>
    </div>
</div>

<style lang="sass">
    .time-line
        flex-basis: 100%
        margin: 0.5rem
        padding: 10px 0

        &:hover
            cursor: pointer

        &-bar
            height: 5px
            background: rgba(255, 255, 255, 0.2)
            border-radius: 30px
            position: relative
            width: 100%

        &-counter
            background: var(--highlight-color)
            position: absolute
            left: 0
            height: inherit
            border-radius: inherit
</style>