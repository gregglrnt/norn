<script lang="ts">
	import { isSearchOpen } from '@/interact/commands'
	import Tiltle from '../layout/Tiltle.svelte'
	import Search from '../search/Search.svelte'
	import CalendarSwitcher from './CalendarSwitcher.svelte'
	import LikedYears from './LikedYears.svelte'

	const closeWheel = () => {
		isSearchOpen.set(false)
	}
</script>

<div class="wheel-container">
	<div class="wheel">
		<div id="left-gutter">
			<button on:click={() => closeWheel()}
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="50px"
					height="50px"
					viewBox="0 0 24 24"
					><path
						fill="var(--highlight-color)"
						fill-rule="evenodd"
						d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m7.293-2.707a1 1 0 0 1 1.414 0L12 10.586l1.293-1.293a1 1 0 1 1 1.414 1.414L13.414 12l1.293 1.293a1 1 0 0 1-1.414 1.414L12 13.414l-1.293 1.293a1 1 0 0 1-1.414-1.414L10.586 12l-1.293-1.293a1 1 0 0 1 0-1.414"
						clip-rule="evenodd"
					/></svg
				><span>Close the wheel</span></button
			>
			<Search />
			<CalendarSwitcher />
			<LikedYears />
		</div>
		<div id="middle-gutter">
			<div>
				<div class="center">
					Bored of this ?
					<Tiltle variant="stress">Let's change things around here.</Tiltle>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="sass">
.wheel-container
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: transparentize(#00040D, 0.8)
    backdrop-filter: blur(2px) grayscale(50%)

.wheel
    display: grid
    grid-template-columns: repeat(3, 1fr)
    width: 100%
    height: 100%

    & > div
        // border: 1px solid pink
        display: grid
        gap: 20px
        justify-items: center
        align-content: center

    #middle-gutter
        display: grid
        grid-template-rows: 1fr 2fr 1fr

        & > div
            display: grid
            justify-items: center
            align-items: center

    :global(.tiltle)
        margin: 0

    #left-gutter
        justify-items: center

    button
        display: flex
        flex-direction: row-reverse
        align-items: center
        color: var(--highlight-color)

        span
            display: none

        &:hover
            span
                display: block

</style>
