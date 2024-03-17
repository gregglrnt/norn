<script lang="ts">
	type icon = 'shuffle' | 'play' | 'pause' | 'backward' | 'forward' | 'like' | 'full-like'
	export let type: icon
	// export let action: Function
	export let title: string = ''

	let svg = ''

	$: {
		svg = generateSVG(type)
	}

	const generateSVG = (type: icon) => {
		switch (type) {
			case 'shuffle':
				return '';
			case 'backward':
				return ''
			case 'forward':
				return ''
			case 'pause':
				return ''
			case 'play':
				return ''
			case 'like':
				return ''
			case 'full-like': 
				return ''
		}
	}
</script>

<button class={`control ${type}`} on:click {title}>
	{@html svg}
	<span>{title}</span>
</button>

<style lang="sass">
	.control
		--path-color: var(--highlight-color)
</style>
