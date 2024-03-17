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
	{#if data.events.length === 0}
	<span class="nthg"> Nothing here ... 😴</span>
	{/if}
	{#each data.events as event}
	<Card fact={event}/>
	{/each}
	</div>
</div>

<style lang="sass">
.page
	display: grid
	padding: 20px
	overflow-y: scroll
	scrollbar-width: thin
	scrollbar-color: #000c29 var(--background-color)
	position: relative
	max-height: 80vh

.cards
	display: flex
	flex-direction: column
	justify-content: flex-end
	gap: 15px

.nthg
	color: #474747
</style>
