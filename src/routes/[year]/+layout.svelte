<script lang="ts">
	import { onMount } from 'svelte'
	import { animate, renderUniverse} from "@/animation/rendering"
	import { page } from '$app/stores'
	import { isSearchOpen} from '@/interact/commands'
	import "@/styles/layout.sass"
	import Header from '@/components/layout/Header.svelte'
	import Controls from '@/components/layout/Controls.svelte'
	import Wheel from '@/components/wheel/Wheel.svelte'
	import Music from '@/components/ui/Music.svelte'
	import Toast from '@/components/ui/Toast.svelte'

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
	<Header/>
	<div id="canvas" bind:this={canvas} />
	<slot/>
	<Controls/>
	{#if $isSearchOpen}
		<Wheel/> 
	{/if}
	<Music/>
	<Toast/>
</main>

<style lang="sass">
	.container
		display: flex
		flex-direction: row-reverse
		height: 100vh
</style>
