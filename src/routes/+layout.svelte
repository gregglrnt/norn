<script lang="ts">
	import { onMount } from 'svelte'
	import { renderUniverse, resize } from '@/animation/rendering'
	import { page } from '$app/stores'
	import { isSearchOpen, listenForCommands } from '@/interact/commands'
	import '@/styles/layout.sass'
	import Header from '@/components/layout/Header.svelte'
	import Controls from '@/components/layout/Controls.svelte'
	import Wheel from '@/components/wheel/Wheel.svelte'
	import Music from '@/components/ui/Music.svelte'
	import {QueryClientProvider, QueryClient} from "@tanstack/svelte-query";
	import {browser} from "$app/environment";
	import { century, year } from '@/stores/date'
	import { invalidate } from '$app/navigation'

	let canvas: HTMLDivElement;

	onMount(() => {
		const universe = renderUniverse()
		canvas.replaceChildren(universe)
		resize()
	})

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
			}
		}
	})

</script>

<svelte:window on:resize={() => resize()} />
<svelte:document on:keydown={listenForCommands}/>
<svelte:head>
	<title>Norn 🎼 | Now listening {$page.data.year}</title>
</svelte:head>
	<main class="container">
	<QueryClientProvider client={queryClient}>
		<div class="content">
			<slot></slot>
		</div>
	<Controls />
	<Wheel/>
	</QueryClientProvider>
	<div id="canvas" bind:this={canvas}></div>
	<Music/>
</main>



<style lang="sass">
	.container
		display: grid
		grid-template: 	"header header header" 1fr "content canvas canvas" 2fr "footer footer footer" 1fr
		height: 100vh
		grid-template-columns: repeat(3, 1fr)

		& > *
			position: relative
			z-index: 3

	.content
		grid-area: content
		display: flex
		padding: 1rem
		align-items: center

		@media screen and (width < 1000px)
			grid-area: header

	#canvas
		position: absolute
		top: 0
		left: 0
		width: 100%
		height: 100%
		z-index: 1
			
</style>
