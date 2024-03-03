<script lang="ts">
	import { calendarType, type CalendarType } from "@/stores/date"
	import Bubble from "../templates/Bubble.svelte"
    const switchCalendar = (select : HTMLSelectElement) => {
		const calendar = select.value as CalendarType;
		calendarType.set(calendar);
	}

</script>
<Bubble class="calendar-switcher">
	<label for="calendar"> The calendar format ? </label>
	<select id="calendar" on:change={(e) => switchCalendar(e.currentTarget)}>
		<option value="iso8601" selected={$calendarType === 'iso8601'}
			>gregorian (default) 🇻🇦
		</option>
		<option value="persian" selected={$calendarType === 'persian'}>persian 🇮🇷 </option>
		<option value="islamic" selected={$calendarType === 'islamic'}>islamic ☪️</option>
		<option value="chinese" selected={$calendarType === 'chinese'}>chinese 🇨🇳</option>
		<option value="indian" selected={$calendarType === 'indian'}>indian 🕉️</option>
		<option value="coptic" selected={$calendarType === 'coptic'}>coptic ✝️</option>
		<option value="japanese" selected={$calendarType === 'japanese'}>japanese 🇯🇵</option>
		<option value="buddhist" selected={$calendarType === 'buddhist'}>buddhist 🕉️</option>
		<option value="hebrew" selected={$calendarType === 'hebrew'}>hebrew ✡️</option>
	</select>
</Bubble>

<style lang="sass">
:global(.bubble.calendar-switcher)
    display: flex
    flex-direction: row
    gap: 10px

label
    display: flex
    align-items: center
    font-weight: bold

select
    padding: 10px
    background: var(--text-color)
    font-family: inherit
    font-size: inherit

    option
        &:hover
            background: var(--highlight-color)
</style>