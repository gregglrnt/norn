<script lang="ts">
	import { calendarType, type CalendarType } from "@/stores/date"
	import Bubble from "../templates/Bubble.svelte"
	import { onMount } from "svelte"
    
	//TODO: check problem with default selected

	const switchCalendar = () => {
		calendarType.set(selected);
	}

	let selected : CalendarType;

	onMount(() => {
		selected = $calendarType;
	})

</script>
<Bubble class="calendar-switcher">
	<label for="calendar"> The calendar format ? </label>
	<select id="calendar" bind:value={selected} on:change={() => switchCalendar()}>
		<option value="iso8601"
			>gregorian (default) 🇻🇦
		</option>
		<option value="persian" selected={selected === "persian"}>persian 🇮🇷 </option>
		<option value="islamic" selected={selected == 'islamic'}>islamic ☪️</option>
		<option value="chinese" selected={selected== 'chinese'}>chinese 🇨🇳</option>
		<option value="indian" selected={selected == 'indian'}>indian 🕉️</option>
		<option value="coptic" selected={selected == 'coptic'}>coptic ✝️</option>
		<option value="japanese" selected={selected == 'japanese'}>japanese 🇯🇵</option>
		<option value="buddhist" selected={selected == 'buddhist'}>buddhist 🕉️</option>
		<option value="hebrew" selected={selected == 'hebrew'}>hebrew ✡️</option>
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