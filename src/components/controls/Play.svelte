<script lang="ts">
	import { pauseHistory, playHistory, playing } from '@/interact/play'

	const act = () => {
        if($playing) {
			pauseHistory();
		} else {
			playHistory();
		}
    }
	
</script>

<button class={`control play`} on:click={() => act()}>
	{#if $playing}
		<svg xmlns="http://www.w3.org/2000/svg" width="55px" height="55px" viewBox="0 0 20 20"
			><path
				d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07M7 6v8h2V6zm4 0v8h2V6z"
			/></svg
		>
	{:else}
		<svg xmlns="http://www.w3.org/2000/svg" width="55px" height="55px" viewBox="0 0 1200 1200"
			><path
				d="M600 1200C268.65 1200 0 931.35 0 600S268.65 0 600 0s600 268.65 600 600s-268.65 600-600 600M450 300.45v599.1L900 600z"
			/></svg
		>
	{/if}
    <span> {playing ? "Let's pause here" : "Play automatically"} </span>
</button>

<style lang="sass">
    .play
        --path-color: var(--highlight-color)
</style>