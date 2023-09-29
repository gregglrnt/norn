<script lang="ts">
	import { onMount } from 'svelte';
	import { addEventsToPinSphere, animate, createUniverse } from '$lib/three';
	import { increaseDate, navigateDate } from '$lib/navigation';
	import '../styles/layout.sass';
	import Search from '../components/search/Search.svelte';

	let canvas: HTMLDivElement;
	let isSearchOpen = false;

	onMount(() => {
		document.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowRight') {
				increaseDate(1);
			}
			if (e.key === 'ArrowLeft') {
				increaseDate(-1);
			}
			if(e.key === 'i') {
				isSearchOpen = !isSearchOpen
			}
		});
		const world = createUniverse();
		canvas.replaceChildren(world.domElement);
		animate();
	});
</script>

<header>Norn</header>
<Search bind:open={isSearchOpen}/>
<div class="container">
	<div class="content"><slot /></div>
	<div id="canvas" bind:this={canvas} />
</div>

<footer>Made by @gregglrnt</footer>

<style lang="sass">
    .container
        display: grid
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))
        height: 100vh
    #canvas 
        :global(canvas)
            width: 100%
            height: 100%
</style>
