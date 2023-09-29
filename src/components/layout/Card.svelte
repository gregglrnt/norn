<script lang="ts">
	export let title: string;
</script>

<div class="card">
	<h2> {title} </h2>
	<slot></slot>
</div>

<style lang="sass">
    .card
        border: 1px solid red
</style>
