<script lang="ts">
    type Levels = 1 | 2 | 3 | 4 | 5 | 6
    export let level : Levels = 2
    export let variant : "highlight" | "stress" = "highlight"
    const tag = `h${level}`

</script>

<svelte:element this={tag} class={`tiltle ${variant}`}> <slot/> </svelte:element>

<style lang="sass">
    .tiltle
        transform: skewY(-2deg)
        text-decoration: underline var(--highlight-color)
        text-underline-offset: 10px
        margin: 0 0 1rem 1rem
        text-shadow: 2px 2px 2px rgba(206,89,55,0.15)
        font-weight: 200

        &.stress
            text-decoration-color: var(--stress-color)
</style>