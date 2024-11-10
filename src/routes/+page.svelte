<script lang='ts'>
	import { derived } from "svelte/store"
	import { createQuery } from "@tanstack/svelte-query"
	import { formatChronicles } from "@/lib/date"
	import type { Fact } from "@/types/fact"
	import { century } from "@/stores/date"
	import Stack from "@/components/layout/Stack.svelte"

	const query = createQuery<Fact[]>((derived(century,  ($century) => ({
			queryKey: ['century', $century],
			queryFn: async () => await fetch(`/events/${$century}`).then((r) => r.json().then((d) => formatChronicles(d))),
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
