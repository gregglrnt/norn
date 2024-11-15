<script lang="ts">
	import { toggleWheel } from '@/interact/commands'
	import { pauseHistory, playHistory, playing } from '@/interact/play'
	import { calendarType, convertYear, year } from '@/stores/date'
	import { era } from '@/stores/era'

	let yearWithFormat: string;

	$: {
        yearWithFormat = convertYear($year);
        $calendarType;
    }
	
</script>

<div class="container">
<button title="Click to change year" class="play" class:playing={$playing} on:click={() => toggleWheel()}>
	<time class="year">{yearWithFormat}</time>
	<span class="tooltip">📅 {$calendarType}</span>
	<small>{$era}</small>
</button>
</div>

<style lang="sass">
.container
	all: unset
	display: flex
	flex: 2
	max-width: 200px


.play
	display: flex
	flex-direction: column
	align-items: center
	border-radius: 50px
	background: var(--text-color)
	color: var(--background-color)
	border: 1px solid var(--highlight-color)
	padding: 1rem
	width: 100%
	border: 1px solid #b0b0b0

	&:hover 
		background: var(--highlight-color)

	.year
		font-size: 2.5rem
</style>