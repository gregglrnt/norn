<script lang="ts">
	type icon = 'shuffle' | 'play' | 'pause' | 'backward' | 'forward' | 'like'
	export let type: icon
	export let action: Function
	export let title: string = ''

	let svg = ''

	$: {
		svg = generateSVG(type)
	}

	const generateSVG = (type: icon) => {
		switch (type) {
			case 'shuffle':
				return '<svg xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" viewBox="0 0 256 256"><path fill="white" d="M237.66 178.34a8 8 0 0 1 0 11.32l-24 24a8 8 0 0 1-11.32-11.32L212.69 192h-11.75a72.12 72.12 0 0 1-58.59-30.15l-41.72-58.4A56.1 56.1 0 0 0 55.06 80H32a8 8 0 0 1 0-16h23.06a72.12 72.12 0 0 1 58.59 30.15l41.72 58.4A56.1 56.1 0 0 0 200.94 176h11.75l-10.35-10.34a8 8 0 0 1 11.32-11.32ZM143 107a8 8 0 0 0 11.16-1.86l1.2-1.67A56.1 56.1 0 0 1 200.94 80h11.75l-10.35 10.34a8 8 0 0 0 11.32 11.32l24-24a8 8 0 0 0 0-11.32l-24-24a8 8 0 0 0-11.32 11.32L212.69 64h-11.75a72.12 72.12 0 0 0-58.59 30.15l-1.2 1.67A8 8 0 0 0 143 107m-30 42a8 8 0 0 0-11.16 1.86l-1.2 1.67A56.1 56.1 0 0 1 55.06 176H32a8 8 0 0 0 0 16h23.06a72.12 72.12 0 0 0 58.59-30.15l1.2-1.67A8 8 0 0 0 113 149"/></svg>'
			case 'backward':
				return '<svg xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" viewBox="0 0 20 20"><path fill="white" d="m10.903 2.931l-.001 5.108l6.615-5.593c.62-.526 1.58-.323 1.58.485v14.14c0 .805-.96 1.009-1.58.483l-6.615-5.593v5.11c0 .805-.96 1.009-1.58.483l-8.085-6.836a.936.936 0 0 1 0-1.434l8.086-6.838c.62-.526 1.58-.323 1.58.485"/></svg>'
			case 'forward':
				return '<svg xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" viewBox="0 0 20 20"><path fill="white" fill-rule="evenodd" d="M9.097 8.038v-5.19c.038-.343.227-.563.568-.662c.341-.1.678-.013 1.012.26l8.086 6.838a.924.924 0 0 1 .334.716c0 .28-.111.52-.334.718l-8.14 6.884c-.333.23-.66.299-.98.205c-.32-.093-.502-.298-.546-.613v-5.238l-6.614 5.598c-.33.264-.68.349-1.046.253c-.366-.095-.544-.3-.534-.613V2.93c-.01-.329.14-.566.451-.712c.311-.146.668-.089 1.07.172z" /></svg>'
			case 'pause':
				return '<svg xmlns="http://www.w3.org/2000/svg" width="55px" height="55px" viewBox="0 0 20 20"><path fill="white" d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07M7 6v8h2V6zm4 0v8h2V6z"/></svg>'
			case 'play':
				return '<svg xmlns="http://www.w3.org/2000/svg" width="55px" height="55px" viewBox="0 0 1200 1200"><path fill="white" d="M600 1200C268.65 1200 0 931.35 0 600S268.65 0 600 0s600 268.65 600 600s-268.65 600-600 600M450 300.45v599.1L900 600z"/></svg>'
			case 'like':
				return '<svg xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" viewBox="0 0 256 256"><path fill="currentColor" d="M178 34c-21 0-39.26 9.47-50 25.34C117.26 43.47 99 34 78 34a60.07 60.07 0 0 0-60 60c0 29.2 18.2 59.59 54.1 90.31a334.68 334.68 0 0 0 53.06 37a6 6 0 0 0 5.68 0a334.68 334.68 0 0 0 53.06-37C219.8 153.59 238 123.2 238 94a60.07 60.07 0 0 0-60-60m-50 175.11C111.59 199.64 30 149.72 30 94a48.05 48.05 0 0 1 48-48c20.28 0 37.31 10.83 44.45 28.27a6 6 0 0 0 11.1 0C140.69 56.83 157.72 46 178 46a48.05 48.05 0 0 1 48 48c0 55.72-81.59 105.64-98 115.11"/></svg>'
		}
	}
</script>

<button class={`control ${type}`} on:click={() => action()} {title}>
	{@html svg}
	<span>{title}</span>
</button>

<style lang="sass">
    .control
        all: unset
        padding: 5px
        display: flex
        align-items: center
        gap: 5px
        transition: ease-in-out 0.5s

        span
            width: 0
            white-space: nowrap
            overflow: hidden
            transition: all ease-in-out 0.2s
            color: var(--highlight-color)


        &:hover
            cursor: pointer

            span
                width: auto

            :global(path)
                fill: var(--highlight-color)

        &.like
            span 
                color: var(--stress-color)

            &:hover :global(path)
                fill: var(--stress-color)
</style>
