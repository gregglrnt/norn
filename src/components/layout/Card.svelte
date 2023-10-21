<script lang="ts">
	export let title: string
	export let selected: boolean = false
	export let focus: boolean = false
</script>

<div class={`card ${selected ? 'selected' : ''} ${focus ? 'focus' : ''}`}>
	<header> <h2>{title}</h2> <slot name="controls"/> </header>
	<slot />
</div>

<style lang="sass">
	.card
		padding: 16px
		background: rgba( 106, 106, 106, 0.1 )
		box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )
		backdrop-filter: blur( 15px )
		-webkit-backdrop-filter: blur( 15px )
		border-radius: 8px
		border: 1px solid rgba( 255, 255, 255, 0.18 )
		opacity: 0.6
		&.selected
			opacity: 1
		&.focus
			border-color: red
		
		header
			display: flex
			gap: 8px
			justify-content: space-between

</style>
