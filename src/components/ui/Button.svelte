<script lang="ts">
    let className: string = ""
    export {className as class};
    export let primary: boolean = false;
    export let title: string = "";
    export let disabled = false;
    // export let bg: string = "transparent";
</script>

<button class={`button ${primary ? "primary": undefined} ${className}`} title={title} disabled={disabled}>
    <span><slot/></span>
</button>

<style lang="sass">
    .button
        all: unset
        padding: 5px 10px
        border: 1px solid transparent

        &.primary
            transform: skewX(-4deg)
            border: 1px solid black
            padding: 5px 20px

            span
                transform: skewX(4deg)

        &:hover
            cursor: pointer
            background: var(--highlight-color)
            border-radius: 8px
</style>