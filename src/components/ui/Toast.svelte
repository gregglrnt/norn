<script lang="ts">
	import { pop } from "@/stores/pop"
	import { fly } from "svelte/transition"

    pop.subscribe((toast) => {
        if(toast) setTimeout(() => pop.set(null), 5000)
    });

</script>

<div data-testid="toast-container" id="toast-container">
    {#if $pop}
    <div class={`toast-pop ${$pop?.status}`} id="toast-pop" transition:fly={{x: -100}}>
        {$pop.message}
    </div>
    {/if}
</div>

<style lang="sass">
    #toast-container
        position: absolute
        height: 100%
        width: 100%
        display: flex
        align-items: flex-start
        z-index: 15
        pointer-events: none

    .toast-pop
        margin: 2rem
        padding: 0.8rem
        border-radius: 0.8rem
        background: var(--text-color)

        &.error
            background: var(--error-color)
            color: var(--text-color)

        &.success
            background: var(--success-color)
            color: var(--background-color)
</style>