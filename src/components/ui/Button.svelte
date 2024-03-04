<script lang="ts">
    let className: string = ""
    export {className as class};
    export let primary: boolean = false;
    export let title: string = "";
    export let disabled = false;
    // export let bg: string = "transparent";
</script>

<button class={`button ${primary ? "primary": undefined} ${className}`} title={title} disabled={disabled} on:click>
    <span><slot/></span>
</button>

<style lang="sass">
    .button
        all: unset
        padding: 5px 30px
        border: 1px solid transparent
        background: #c2c2c2
        border-radius: 8px
        margin: auto

        &:hover
            cursor: pointer
            background: var(--highlight-color)
</style>