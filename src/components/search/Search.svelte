<script lang="ts">
	import Bubble from '../templates/Bubble.svelte'
	import Button from '../ui/Button.svelte'
	import { pauseHistory } from '@/interact/play'
	import { onMount } from 'svelte'
	import { year } from '@/stores/date'
	import { search } from '@/lib/search'

	let value: number
	pauseHistory()

	onMount(() => {
		value = Number($year)
	})

	const handleEnter = (e: KeyboardEvent) => {
		if (e.key === 'Enter') search(value)
	}

</script>

<Bubble class="search">
	<label>Change the year <input type="number" bind:value on:keydown={handleEnter} /></label>
	<span> Soon, you'll be able to filter by character </span>
	<span> And by year </span>
	<small> Note: you can only search with gregorian calendar as for now </small>
	<Button on:click={() => search(value)}>Search this!</Button>
</Bubble>

<style lang="sass">
	:global(.bubble.search)
		gap: 10px

	label
		font-weight: bold
</style>
