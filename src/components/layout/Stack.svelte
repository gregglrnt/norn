<script lang="ts">
	import type { Fact } from '@/types/fact'
	import Card from './Card.svelte'

	export let cards: Fact[]
    $: focused = 0

    const swipe = (sum: number) => {
        const res = focused + sum;
        if(res > cards.length) {
            return focused = 0
        }
        if (res < 0) {
            return focused = cards.length - 1
        }
        return focused = res;
    }

</script>

<div class="stack">
	<button class="stack-btn" on:click={() => swipe(-1)}>{'<'}</button>
	<div class="stack-track">
		{#each cards as event, key}
			<Card class={`${key === focused ? 'focus' : ''}`} fact={event} position={key} total={cards.length}/>
		{/each}
	</div>
	<button class="stack-btn" on:click={() => swipe(1)}>{'>'}</button>
</div>

<style lang="sass">
.stack
    height: 100%
    display: flex
    align-items: center
    gap: 2rem

    @for $i from 1 through 4
        &:nth-child(#{$i}n)
            left: random(10) + px

    &-track
        position: relative
        height: 100%
        display: flex
        align-items: inherit
        flex: 1

    &-btn
        font-family: monospace
        background: var(--text-color)
        width: 2rem
        height: 2rem
        border-radius: 2rem
        color: var(--background-color)
        display: flex
        align-items: center
        justify-content: center
        opacity: 0.5

        &:hover
            opacity: 1
            
:global(.focus)
    z-index: 12

@media screen and (width < 760px)
    .stack
        margin-bottom: 2rem
        align-items: normal
</style>
