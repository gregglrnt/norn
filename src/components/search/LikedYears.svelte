<script lang="ts">
	import { getFavoriteYears } from "@/interact/user"
    const likedYears = getFavoriteYears();
</script>

<fieldset id="liked-years">
    <span>My favorite years 💗</span>
    {#each likedYears as year}
    <a class="liked" href={`/${year}`}> {year} </a>
    {/each}
</fieldset>

<style lang="sass">
fieldset
    border: none
    display: flex
    flex-wrap: wrap
    gap: 1em
     
    span
        font-weight: bold 
        flex-basis: 100%
</style>