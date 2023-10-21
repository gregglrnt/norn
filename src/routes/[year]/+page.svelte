<script lang="ts">
	import type { PageData } from './$types'
	import { addEventsToPinSphere } from '$lib/three'
	import EventCard from '@/components/layout/EventCard.svelte'
	import type { Chronicle } from '@/types/chronicle'
	import { currentEvent } from '@/stores/events'

	export let data: PageData
	$: {
		addEventsToPinSphere(data.events)
	}

	const focusOnEvent = (e: Chronicle) => {
		console.log('shit happens !', e.id)
		currentEvent.set(e)
	}
</script>

<div class="page">
	<h1>Welcome in {data.year}</h1>
	<p>
		To change the year, press <kbd> i </kbd> or <kbd> Arrow left </kbd> (-1)
		<kbd> Arrow right</kbd> (+1)
	</p>
	{#each data.events as event}
		<EventCard
			{event}
			isFocus={$currentEvent?.id === event.id}
			selected={event.date.getFullYear() === data.year}
			on:setFocus={() => focusOnEvent(event)}
		/>
	{/each}
</div>

<style lang="sass">
@import "../../styles/variables"
@import "../../styles/mixins"

.page
	display: grid
	gap: 1rem
	padding: 8px

h1
	@include title-gradient
	position: relative
	display: inline-block
	justify-self: baseline
	&::before
		position: absolute
		left: 16px
		top: 42%
		height: 70%
		background: black
		width: 100%
		content: ""
		z-index: -1


</style>
