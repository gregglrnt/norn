<script lang="ts">
	import type { Fact } from '@/types/fact'
	import Card from './Card.svelte'
	import { addEventsToPinSphere } from '@/render/rendering'
	import { currentDecade } from '@/interact/navigation'

    type Props = {
        cards: Fact[],
    }

	let {cards} : Props = $props();
    let focused = $state(0);

    $effect(() => addEventsToPinSphere(cards));

    $effect(() => { $currentDecade ; focused = 0 } )

    const swipe = (sum: number) => {
        const res = focused + sum;
        if(res > cards.length - 1) {
            return focused = 0
        }
        if (res < 0) {
            return focused = cards.length - 1
        }
        return focused = res;
    }

</script>

<div class="stack" class:one-stack={cards.length <= 1}>
	<div class="stack-track">
		{#each cards as event, key}
			<Card class={`${key === focused ? 'focus' : ''}`} fact={event} position={key} total={cards.length}/>
		{/each}
	</div>
    <div class="stack-controls">
	<button class="stack-btn" onclick={() => swipe(-1)}>{'<'}</button>
	<button class="stack-btn" onclick={() => swipe(1)}>{'>'}</button>
    </div>
</div>

<style lang="sass">
.stack
    display: flex
    flex-direction: column
    width: 100%
    gap: 1rem

    &-track
        display: grid
        grid-template: 1fr / 1fr
        align-items: inherit
        flex: 1

        & > :global(.card)
            grid-column: 1 / 1
            grid-row: 1 / 1
            z-index: 1
            height: 100%

        & > :global(.card.focus)
            z-index: 2

    &-controls
        display: flex
        justify-content: center
        gap: 1rem


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
        opacity: 0.9
        border: 1px solid #b0b0b0


        &:hover
            opacity: 1

.one-stack
    .stack-btn
        display: none
</style>
