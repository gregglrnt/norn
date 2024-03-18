<script lang="ts">
	import { getFavoriteYears } from '@/interact/user'
	import Bubble from '../templates/Bubble.svelte'
	import Tiltle from '../layout/Tiltle.svelte'
	import { goto } from '$app/navigation'
	import { isSearchOpen } from '@/interact/commands'
	const likedYears = getFavoriteYears()

    const goToLikedYear = (year: string) => {
        goto(`/${year}`);
        isSearchOpen.set(false);
    }

</script>

<Bubble class="liked-years">
	<Tiltle variant="stress">Go back to your favorite years</Tiltle>
	<fieldset id="liked-years">
        {#if likedYears.length === 0} 
            <span> You have no liked years yet. You can add them with the little heart 💟 </span>
        {/if}
		{#each likedYears as year}
			<button class="liked" on:click={() => goToLikedYear(year)}> {year} </button>
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
    
    button
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
