<script lang="ts">
    export let level = 2
    export let variant : "highlight" | "stress" = "highlight"
    const tag = `h${level}`

</script>

<svelte:element this={tag} class={`tiltle italic ${variant}`}> <slot/> </svelte:element>

<style lang="sass">
    .tiltle
        transform: skewY(-2deg)
        text-decoration: underline var(--highlight-color)
        text-underline-offset: 10px
        margin: 0 0 1rem 1rem
        text-shadow: 2px 2px 2px rgba(206,89,55,0.15)

        &.stress
            text-decoration-color: var(--stress-color)
</style>