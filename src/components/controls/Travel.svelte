<script lang="ts">
	import { increaseDecade } from '@/interact/navigation'

	export let type: 'backward' | 'forward'

	const handleClick = () => {
		if (type === 'backward') increaseDecade(-1)
		if (type === 'forward') increaseDecade(1)
	}
</script>

<button class={`control ${type}`} on:click={() => handleClick()}>
	{#if type === 'backward'}
		<svg xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" viewBox="0 0 20 20"
			><path
				d="m10.903 2.931l-.001 5.108l6.615-5.593c.62-.526 1.58-.323 1.58.485v14.14c0 .805-.96 1.009-1.58.483l-6.615-5.593v5.11c0 .805-.96 1.009-1.58.483l-8.085-6.836a.936.936 0 0 1 0-1.434l8.086-6.838c.62-.526 1.58-.323 1.58.485"
			/></svg
		>
		<span> Go back 10 years </span>
	{:else}
		<svg xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" viewBox="0 0 20 20"
			><path
				fill-rule="evenodd"
				d="M9.097 8.038v-5.19c.038-.343.227-.563.568-.662c.341-.1.678-.013 1.012.26l8.086 6.838a.924.924 0 0 1 .334.716c0 .28-.111.52-.334.718l-8.14 6.884c-.333.23-.66.299-.98.205c-.32-.093-.502-.298-.546-.613v-5.238l-6.614 5.598c-.33.264-.68.349-1.046.253c-.366-.095-.544-.3-.534-.613V2.93c-.01-.329.14-.566.451-.712c.311-.146.668-.089 1.07.172z"
			/></svg
		>
		<span>Go forward 10 years </span>
	{/if}
</button>
