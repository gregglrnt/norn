<script lang="ts">
	import type { Snippet } from "svelte"


    const {class: classNames, children} = $props<{class ?: string, children: Snippet}>()

</script>
<div data-testid="bubble" class={`bubble ${classNames}`}>
    {@render children?.()}
</div>

<style lang='sass'>
// $background: linear-gradient(100deg, rgba(255,255,255,0.7) 0%, rgba(217,217,217,1) 0%, rgba(217,217,217,0.9164040616246498) 100%)

.bubble
    padding: 1rem
    background: var(--text-color)
    border-radius: 0.3rem
    color: var(--background-color)
    display: flex
    flex-direction: column
    border: 1px solid #b0b0b0

</style>

