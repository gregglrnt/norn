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

<div class="stack" class:one-stack={cards.length === 1}>
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
    display: flex
    align-items: center
    gap: 1rem

    @for $i from 1 through 4
        &:nth-child(#{$i}n)
            left: random(10) + px

    &-track
        display: grid
        grid-template: 1fr / 1fr
        align-items: inherit
        place-items: center
        flex: 1

        & > :global(.card)
            grid-column: 1 / 1
            grid-row: 1 / 1
            z-index: 1

        & > :global(.card.focus)
            z-index: 2

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
        opacity: 0.7

        &:hover
            opacity: 1

.one-stack
    .stack-btn
        display: none
</style>
