<script lang="ts">
	import { calendarType } from "@/stores/date"
	import Help from "../ui/Help.svelte"
	import { year } from "@/stores/date"
    import WheelButton from "../ui/WheelButton.svelte"

</script>

<header id="welcome">
    <p class="overtitle"><span class="logo">Norn</span> - Your history broadcast <br/> Brought to you by @gregglrnt <br/> Currently using the <strong>{$calendarType}</strong> calendar </p>
	<h1>This is <button id="year"> {$year} </button>!</h1>
    <p class="undertitle italic">Go through history like a good playlist</p>
    <p> <strong>A lot of stuff happened in {$year}.</strong> You can explore them with the cards on your left. Otherwise, if it's not good enough, use your controls on the bottom.</p>
    <Help/>
    <WheelButton/>
</header>

<style lang="sass">
    #welcome
        display: flex
        flex-direction: column
        justify-content: center
        padding: 35px
    h1
        font-size: 48px
        font-weight: normal
        margin: 24px 0

    .undertitle
        font-size: 24px
        margin: 0

    .overtitle
        font-size: 15px
        text-transform: uppercase
        .logo
            letter-spacing: 10px
            color: var(--highlight-color)

    #year
        all: unset
        color: var(--highlight-color)
        &:hover
            cursor: pointer
            text-decoration: 1px solid var(--highlight-color)
            text-underline-offset: 10px
</style>
