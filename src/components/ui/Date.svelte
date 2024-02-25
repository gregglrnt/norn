<script lang="ts">
	import { calendarType, getFullDate } from '@/stores/date'
	import type { DateTime } from 'luxon'
	export let src: DateTime
	let className: string
	export { className as class }

	let date = ""

	$ : {
		$calendarType // TODO: find a better way to handle calendar changes
		date = getFullDate(src)
	}

</script>

<time class={className}> {date} </time>
