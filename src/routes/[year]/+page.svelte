<script lang="ts">
	import type { PageData } from './$types'
	import { addEventsToPinSphere } from "@/animation/rendering"
	import { onMount } from 'svelte'
	import { listenForCommands } from '@/interact/commands'
	import Card from '@/components/layout/Card.svelte'

	export let data: PageData
	$: {
		addEventsToPinSphere(data.events)
	}

	onMount(() => {
		document.addEventListener('keydown', listenForCommands)
	})

</script>

<div class="page">
	<div class="cards">
	{#each data.events as event}
	<Card key={event.id} fact={event}/>
	{/each}
	</div>
</div>

<style lang="sass">
.page
	display: grid
	padding: 20px
	overflow-y: scroll
	scrollbar-width: thin
	scrollbar-color: #000c29var(--background-color)
	position: relative
	max-height: 80vh

.cards
	display: flex
	flex-direction: column
	justify-content: flex-end
	gap: 15px
</style>
