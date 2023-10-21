<script lang="ts">
	export let open = false;
	export let date : number;
	let nextDate = date.toString();
	let searchInput : HTMLInputElement;

	$ : {
		if(open && searchInput) {
			setTimeout(() => searchInput.focus(), 0);
		}
	}
	const closeSearch = () => {
		open = !open;
	}

</script>

<dialog open={open}>
	<p class="highlight">Let's travel in time ! 🚀 </p>
	<form on:submit={closeSearch} action={`/${nextDate}`}>
	<input class="glass" bind:this={searchInput} type="number" value={date} on:change={(e) => nextDate = e.currentTarget.value.toString()} />
	</form>
</dialog>

<style lang="sass">
	dialog
		background: rgba( 255, 255, 255, 0.25 )
		box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )
		backdrop-filter: blur( 4px )
		-webkit-backdrop-filter: blur( 4px )
		border-radius: 10px
		border: 1px solid rgba( 255, 255, 255, 0.18 )
		z-index: 4
		color: white

		p
			margin-bottom: 8px

</style>