<script lang="ts">
	import { onMount } from 'svelte'
	import { renderUniverse, resizeCanvas } from '@/animation/rendering'
	import { page } from '$app/stores'
	import { isSearchOpen } from '@/interact/commands'
	import '@/styles/layout.sass'
	import Header from '@/components/layout/Header.svelte'
	import Controls from '@/components/layout/Controls.svelte'
	import Wheel from '@/components/wheel/Wheel.svelte'
	import Music from '@/components/ui/Music.svelte'
	import Toast from '@/components/ui/Toast.svelte'

	let canvas: HTMLCanvasElement;

	onMount(() => {
		renderUniverse(canvas)
		// canvas.replaceChildren(world.domElement)
		resizeCanvas()
	})
</script>

<svelte:window on:resize={() => resizeCanvas()} />
<svelte:head>
	<title>Norn 🎼 | Now listening {$page.data.year}</title>
</svelte:head>
<div class="layout">
	<!-- <Controls />
	<main class="container">
		<slot />
		{#if $isSearchOpen}
			<Wheel />
		{/if}
		<Music />
		<Toast />
	</main> -->
	<canvas id="canvas" bind:this={canvas} />
</div>

<style lang="sass">
	.layout
		display: grid
		grid-template: 'main' 80% 'header' 20%
		height: 100vh
	.container
		display: flex
		flex-direction: row-reverse
		grid-area: main	

		@media screen and (width < 760px)
			flex-direction: column
			max-height: 100vh
			
</style>
