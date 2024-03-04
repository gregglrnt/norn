<script lang="ts">
	import { getFavoriteYears } from '@/interact/user'
	import Bubble from '../templates/Bubble.svelte'
	import Tiltle from '../layout/Tiltle.svelte'
	const likedYears = getFavoriteYears()
</script>

<Bubble class="liked-years">
	<Tiltle variant="stress">Go back to your favorite years</Tiltle>
	<fieldset id="liked-years">
		{#each likedYears as year}
			<a class="liked" href={`/${year}`}> {year} </a>
		{/each}
	</fieldset>
</Bubble>

<style lang="sass">
$red: #f92f60

fieldset
    border: none
    display: flex
    flex-wrap: wrap
    margin: 20px 0 0 0
    padding: 0
    gap: 1em
    a
        all: unset
        display: inline-block
        border: 1px solid $red
        padding: 4px 8px
        border-radius: 8px

        &:before
            content: "💖"

        &:hover
            cursor: pointer
            background: $red
            color: white
</style>
