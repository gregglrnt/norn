<script lang="ts">
	import { page } from "$app/stores"
	import { MAXYEAR, MINYEAR } from "@/stores/date"
	import { derived, get } from "svelte/store"

    const timeLength = Math.abs(MAXYEAR) + Math.abs(MINYEAR)
    const width = derived(page, ($page) => (parseInt($page.data.year) + Math.abs(MINYEAR)) / timeLength)

</script>

<div class="time-line">
    <div class="time-line-counter" style={`width: ${$width * 100}%`}></div>
</div>

<style lang="sass">
    .time-line
        flex-basis: 100%
        margin: 20px
        height: 5px
        border-radius: 30px
        background: rgba(255, 255, 255, 0.2)
        position: relative

        &-counter
            background: var(--highlight-color)
            position: absolute
            left: 0
            height: inherit
            border-radius: inherit
</style>