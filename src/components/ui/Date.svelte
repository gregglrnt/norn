<script lang="ts">
	import { calendarType, getFullDate } from '@/stores/date'
	import type { DateWithFormat } from '@/types/fact'
	export let from: DateWithFormat
	let className: string = ""
	export { className as class }

	let date = ''
	let dateDay = ''

	//TODO: improve accessibility of time

	$: {
		$calendarType // TODO: find a better way to handle calendar changes
		if (from.format === 'year') {
			date = from.year.toString()
		} else {
			let { day, year } = getFullDate(from.value)
			dateDay = day
			date = year
		}
	}
</script>

<time data-testid="date" class={className}> {dateDay} <span class="year"> {date} </span></time>

<style lang="sass">
	time
		.year
			font-weight: bold
			margin-left: 0.5rem
</style>