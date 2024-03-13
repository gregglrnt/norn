<script lang="ts">
	import { calendarType, getFullDate } from '@/stores/date'
	import type { DateWithFormat } from '@/types/fact'
	export let src: DateWithFormat
	let className: string
	export { className as class }

	let date = ''
	let dateDay = ''

	$: {
		$calendarType // TODO: find a better way to handle calendar changes
		if (src.format === 'year') {
			date = src.year.toString()
		} else {
			let { day, year } = getFullDate(src.value)
			dateDay = day
			date = year
		}
	}
</script>

<time class={className}> {dateDay} <span class="year"> {date} </span> </time>

<style lang="sass">
	time
		.year
			margin-left: 0.5rem
			font-weight: bold
</style>
