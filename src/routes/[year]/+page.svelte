<script lang="ts">
	import type { PageData } from './$types'
	import { addEventsToPinSphere } from "@/animation/rendering"
	import { currentEvent } from '@/stores/events'
	import { onMount } from 'svelte'
	import { listenForCommands } from '@/interact/commands'
	import type { Fact } from '@/types/fact'
	import Card from '@/components/layout/Card.svelte'

	export let data: PageData
	$: {
		addEventsToPinSphere(data.events)
	}

	const focusOnFact = (e: Fact) => {
		console.log('shit happens !', e.id)
		currentEvent.set(e)
	}

	onMount(() => {
		document.addEventListener('keydown', listenForCommands)
	})

</script>

<div class="page">
	{#each data.events as event}
	<Card key={event.id} fact={event}/>
	{/each}
</div>

<style lang="sass">
.page
	display: grid
	padding: 20px
	gap: 50px
	place-content: center
	overflow-y: scroll
	scrollbar-width: thin
	scrollbar-color: #000c29var(--background-color)
	position: relative
</style>
