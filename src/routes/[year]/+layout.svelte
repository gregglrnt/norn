<script lang="ts">
	import { onMount } from 'svelte'
	import { animate, renderUniverse, focusOnPinSphere } from "@/animation/rendering"
	import { page } from '$app/stores'
	import { currentEvent } from '@/stores/events'
	import { isSearchOpen, listenForCommands } from '@/interact/commands'
	import "@/styles/layout.sass"
	import Header from '@/components/layout/Header.svelte'
	import Controls from '@/components/layout/Controls.svelte'
	import Wheel from '@/components/wheel/Wheel.svelte'

	let canvas: HTMLDivElement

	onMount(() => {
		const world = renderUniverse()
		canvas.replaceChildren(world.domElement)
		animate()
	})
</script>

<svelte:head>
	<title> Norn 🎼 | Now listening {$page.data.year} </title>
</svelte:head>
<main class="container">
	<slot/>
	<div id="canvas" bind:this={canvas} />
	<Header/>
	<Controls/>
	{#if $isSearchOpen}
		<Wheel/> 
	{/if}
</main>

<style lang="sass">
	.container
		display: grid
		grid-template-columns: repeat(3, 1fr)
		height: 100vh
</style>
