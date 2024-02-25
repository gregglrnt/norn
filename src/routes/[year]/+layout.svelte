<script lang="ts">
	import { onMount } from 'svelte'
	import { animate, renderUniverse, focusOnPinSphere, pointerListener } from "@/animation/rendering"
	import { increaseDate } from "@/interact/navigation";
	import Search from '@/components/search/Search.svelte'
	import { page } from '$app/stores'
	import { currentEvent } from '@/stores/events'
	import { isSearchOpen, listenForCommands } from '@/interact/commands'
	import "@/styles/layout.sass"
	import Welcome from '@/components/layout/Welcome.svelte'
	import Controls from '@/components/layout/Controls.svelte'

	let canvas: HTMLDivElement

	$ : {
		if($currentEvent) focusOnPinSphere($currentEvent.id)
	}
	//export let data: LayoutData
	console.log("p", $page.data.year);

	onMount(() => {
		document.addEventListener('pointermove', pointerListener)
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
	<Welcome></Welcome>
	<Controls/>
	<Search/>
</main>

<style lang="sass">
	.container
		display: grid
		grid-template-columns: repeat(3, 1fr)
		height: 100vh
</style>
