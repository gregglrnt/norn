<script lang="ts">
	import { onMount } from 'svelte'
	import { animate, createUniverse, focusOnPinSphere } from '$lib/three'
	import { increaseDate } from '$lib/navigation'
	import '@/styles/font.css'
	import '@/styles/layout.sass'
	import '@/styles/glass.sass'
	import Search from '@/components/search/Search.svelte'
	import { page } from '$app/stores'
	import { currentEvent } from '@/stores/events'

	let canvas: HTMLDivElement
	let isSearchOpen = false

	$ : {
		if($currentEvent) focusOnPinSphere($currentEvent.id)
	}
	//export let data: LayoutData

	onMount(() => {
		document.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowRight') {
				increaseDate($page.data.year, 1)
			}
			if (e.key === 'ArrowLeft') {
				increaseDate($page.data.year, -1)
			}
			if (e.key === 'i') {
				isSearchOpen = !isSearchOpen
			}
		})
		const world = createUniverse()
		canvas.replaceChildren(world.domElement)
		animate()
	})
</script>

<header>Norn</header>
<Search bind:open={isSearchOpen} date={$page.data.year} />
<div class="container">
	<div class="content"><slot /></div>
	<div id="canvas" bind:this={canvas} />
</div>

<footer>Made by @gregglrnt</footer>

<style lang="sass">
@import "../styles/mixins"
header 
	@include title-gradient
	font-family: "Megrim"
	font-size: 32px
	font-weight: bold
	text-align: center
.container
	display: grid
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))
	height: 100vh

	#canvas
		:global(canvas)
			width: 100%
			height: 100%
			&:hover
				cursor: grab
</style>
