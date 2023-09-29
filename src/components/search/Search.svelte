<script lang="ts">
	import { navigateDate } from '$lib/navigation';
	import { date } from '../../stores/date';
	export let open = false;
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
	<p>Change this date in order to travel in time 🚀</p>
	<form on:submit={closeSearch}>
	<input bind:this={searchInput} type="number" value={$date} on:change={(e) => navigateDate(e.currentTarget.value)} />
	</form>
</dialog>

<style lang="sass">
	input
		&:focus
			outline: red
</style>