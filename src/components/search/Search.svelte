<script lang="ts">
	import { goto } from '$app/navigation'
	import { isSearchOpen } from '@/interact/commands'
	import { calendarType, year, type CalendarType } from '@/stores/date'
	import Tiltle from '../layout/Tiltle.svelte'
	import Bubble from '../templates/Bubble.svelte'
	import Button from '../ui/Button.svelte'
	import { pauseHistory } from '@/interact/play'
	import type { CalendarSystem } from 'luxon'
	import LikedYears from './LikedYears.svelte'

	let value: string;
	pauseHistory();

	$ : {
		if (!$isSearchOpen) value = $year.toString()
	}

	const search = (event: any) => {
		event.preventDefault()
		goto(value)
	}

	const closeSearch = () => {
		isSearchOpen.set(false)
	}

	const switchCalendar = (select : HTMLSelectElement) => {
		const calendar = select.value as CalendarType;
		calendarType.set(calendar);
	}

</script>

<div id="search">
	<Bubble class="search-bubble">
		<button class="close-search" on:click={() => closeSearch()}>
			Close this
			<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 32 32"
				><path
					fill="currentColor"
					d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"
				/></svg
			>
		</button>
		<Tiltle>Let's change things</Tiltle>
		<form on:submit={search}>
			<div class="field">
				<label for="year"> The year? </label>
				<input
					type="number"
					id="year"
					{value}
					on:change={(e) => (value = e.currentTarget.value)}
				/>
			</div>
			<div class="field">
				<label for="calendar"> The calendar format ? </label>
				<select id="calendar" on:change={(e) => switchCalendar(e.currentTarget)}>
					<option value="iso8601" selected={$calendarType === "iso8601"}>gregorian (default) 🇻🇦 </option>
					<option value="persian" selected={$calendarType === "persian"}>persian 🇮🇷 </option>
					<option value="islamic" selected={$calendarType === "islamic"}>islamic ☪️</option>
					<option value="chinese" selected={$calendarType === "chinese"}>chinese 🇨🇳</option>
					<option value="indian" selected={$calendarType === "indian"}>indian 🕉️</option>
					<option value="coptic" selected={$calendarType === "coptic"}>coptic ✝️</option>
					<option value="japanese" selected={$calendarType === "japanese"}>japanese 🇯🇵</option>
					<option value="buddhist" selected={$calendarType === "buddhist"}>buddhist 🕉️</option>
					<option value="hebrew" selected={$calendarType === "hebrew"}>hebrew ✡️</option>
				</select>
			</div>
			<Button primary on:click={search}>Search this</Button>
		</form>
		<LikedYears/>
	</Bubble>
</div>

<style lang="sass">
	#search
		position: absolute
		width: 100%
		height: 100%
		left: 0
		top: 0
		display: flex
		align-items: center
		justify-content: center
		flex-direction: column
		background: rgba(0, 0, 0, 0.2)

		// &:not(.open)
		// 	display: none

	:global(.search-bubble)
		min-height: 30%
		min-width: 50%
		align-items: center
	
	.close-search
		position: absolute
		top: 20px
		right: 20px
		display: flex
		align-items: center
		gap: 10px

		&:hover
			color: var(--stress-color)
			cursor: pointer
			path:
				fill: var(--stress-color)

	form
		font-size: 20px
		display: flex
		flex-direction: column
		justify-content: space-between
		gap: 20px
		flex: 1

		:global(.button)
			place-self: end

	input[type="number"]
		text-align: right

	select
		background: transparent
		border-radius: 8px
		padding: 8px
		border-color: var(--background-color)
		color: inherit
		font-family: inherit

	.field
		display: flex
		justify-content: space-between
		align-items: center
		gap: 20px

	label
		transform: skewY(-2deg)
		font-weight: 800
</style>
