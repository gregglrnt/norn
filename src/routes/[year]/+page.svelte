<script lang="ts">
	import type { PageData } from './$types'
	import { addEventsToPinSphere } from '@/animation/rendering'
	import { onMount } from 'svelte'
	import { listenForCommands } from '@/interact/commands'
	import Card from '@/components/layout/Card.svelte'
	import Stack from '@/components/layout/Stack.svelte'

	export let data: PageData
	$: {
		addEventsToPinSphere(data.events)
	}

	onMount(() => {
		document.addEventListener('keydown', listenForCommands)
	})
</script>

<svelte:head>
	<meta
		name="description"
		content={data.events.length < 1
			? `Nothing happened in ${data.year}`
			: `Some events in ${data.year} include ${data.events
					.slice(0, 3)
					.map((event) => event.title)
					.join(', ')}...`}
	/>
</svelte:head>
<div class="page">
		{#if data.events.length === 0}
			<span class="nthg"> Nothing here ... 😴</span>
		{:else}
		<Stack bind:cards={data.events}/>
		{/if}
</div>

<style lang="sass">
.page
	display: grid
	padding: 20px
	max-height: 80vh

.nthg
	color: #474747
</style>
