<script lang="ts">
    //TODO: improve accessibility of component
	import { slide } from "svelte/transition"

    let classNames: string = "";

    export {classNames as class}

</script>
<div data-testid="bubble" class={`bubble ${classNames}`} transition:slide={{axis: 'y'}}>
    <slot/>
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
</style>

