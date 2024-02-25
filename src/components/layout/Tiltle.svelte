<script lang="ts">
    export let level = 2
    const tag = `h${level}`
</script>

<svelte:element this={tag} class="tiltle italic"> <slot/> </svelte:element>

<style lang="sass">
    .tiltle
        transform: skewY(-2deg)
        text-decoration: underline var(--highlight-color)
        text-underline-offset: 10px
        margin: 0 0 30px 30px
</style>