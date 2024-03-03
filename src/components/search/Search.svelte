<script lang="ts">
	import { goto } from '$app/navigation'
	import Bubble from '../templates/Bubble.svelte'
	import Button from '../ui/Button.svelte'
	import { pauseHistory } from '@/interact/play'
	import { page } from '$app/stores'
	import { onMount } from 'svelte'

	let value: number;
	pauseHistory();

	onMount(() => {
		value = Number($page.data.year)
	})

	const search = () => {
		const cleanValue = Number(value);
		if(Number.isNaN(cleanValue) || !cleanValue) return; //TODO: implement error
		goto(`/${cleanValue}`)
	}

</script>

<Bubble class="search">
	<label>Change the year <input type="number" bind:value={value}/></label>
	<span> Soon, you'll be able to filter by character </span>
	<span> And by year </span>
	<small> Note: you can only search with gregorian calendar as for now </small>
<Button on:click={() => search()}> Search this! </Button>
</Bubble>

<style lang="sass">
	:global(.bubble.search)
		gap: 10px

	label
		font-weight: bold
</style>
