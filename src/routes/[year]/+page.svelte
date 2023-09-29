<script lang="ts">
	import { formatDateToHTMLDateTime } from '$lib/date'
	import { onMount } from 'svelte'
	import Card from '@/components/layout/Card.svelte'
	import { date } from '@/stores/date'
	import type { PageData } from './$types'
	import { addEventsToPinSphere } from '$lib/three'

	export let data: PageData

	onMount(() => {
		addEventsToPinSphere(data.events);
	})

</script>

<h1>Welcome in {$date}</h1>
{#each data.events as event}
	<Card title={event.title}>
		<time datetime={formatDateToHTMLDateTime(event.date)}> {event.date.toLocaleDateString()} </time>
		<p>{event.description}</p>
	</Card>
{/each}
