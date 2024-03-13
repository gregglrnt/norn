<script lang="ts">
	import { calendarType, getFullDate } from '@/stores/date'
	import type { DateWithFormat } from '@/types/fact'
	export let src: DateWithFormat
	let className: string
	export { className as class }

	let date = ""

	$ : {
		$calendarType // TODO: find a better way to handle calendar changes
		if(src.format === "year") {
			date = src.year.toString()
		} else {
			date = getFullDate(src.value)
		}
	}

</script>

<time class={className}> {date} </time>
