<script lang="ts">
	import { toggleWheel } from '@/interact/commands'
	import { pauseHistory, playHistory, playing } from '@/interact/play'
	import { calendarType, convertYear, year } from '@/stores/date'

	let yearWithFormat: string;

	$: {
        yearWithFormat = convertYear($year);
        $calendarType;
    }
	
</script>

<h1>
<button title="Click to change year" class="play" class:playing={$playing} on:click={() => toggleWheel()}>
	<time class="year">{yearWithFormat}</time>
	<span class="tooltip">📅 {$calendarType}</span>
</button>
</h1>

<style lang="sass">
h1
	all: unset
.play
	display: flex
	flex-direction: column
	align-items: center
	border-radius: 50px
	background: var(--text-color)
	color: var(--background-color)
	border: 1px solid var(--highlight-color)
	padding: 1rem
	min-width: 200px

	&:hover 
		background: var(--highlight-color)

	.year
		font-size: 2.5rem
</style>