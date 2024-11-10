<script lang='ts'>
	import { derived } from "svelte/store"
	import { createQuery } from "@tanstack/svelte-query"
	import { formatChronicles } from "@/lib/date"
	import type { Fact } from "@/types/fact"
	import { century } from "@/stores/date"
	import Stack from "@/components/layout/Stack.svelte"
	import type { ExpectedEventData } from "@/lib/fetch"
	import { currentDecade } from "@/interact/navigation"

	const query = createQuery<Fact[]>((derived(currentDecade,  ($currentDecade) => ({
			queryKey: ['decade', $currentDecade],
			queryFn: async () => {
				const data = await fetch(`/events/${$century}`);
				const events = await data.json() as ExpectedEventData;
				return formatChronicles(events).filter((event) => {
					return event.date.year > $currentDecade && event.date.year < $currentDecade + 10; 
				})
			}
		})))
	)

</script>
	{#if $query.isPending}
	<p>Loading...</p>
	{/if}
	{#if $query.isError}
		<p>Error !</p>
	{/if}
	{#if $query.isSuccess}
		<Stack cards={$query.data}/>
	{/if}
