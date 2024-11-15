<script lang='ts'>
	import { createQuery } from "@tanstack/svelte-query"
	import { formatChronicles } from "@/lib/date"
	import type { Fact } from "@/types/fact"
	import { century } from "@/stores/date"
	import Stack from "@/components/layout/Stack.svelte"
	import type { ExpectedEventData } from "@/lib/fetch"
	import { currentDecade } from "@/interact/navigation"
	import type { PageData } from "./$types"

	let {data } : {data: PageData} = $props();

	let events = $derived.by(() => (
		data.events.filter((event) => event.date.year > $currentDecade && event.date.year < $currentDecade + 10)
	))

</script>

{#if events.length}
<Stack cards={events}/>
{:else}
<p>No data... yet 😉</p>
{/if}
