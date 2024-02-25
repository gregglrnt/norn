<script lang="ts">
    let classNames: string = "";
    export {classNames as class}
</script>

<div class={`bubble ${classNames}`}>
    <slot/>
</div>

<style lang='sass'>
    .bubble
        padding: 20px
        background: linear-gradient(100deg, rgba(255,255,255,0.7) 0%, rgba(217,217,217,1) 0%, rgba(217,217,217,0.9164040616246498) 100%)
        border-radius: 23px
        color: var(--background-color)
        position: relative
        display: flex
        flex-direction: column

        &::after
            content: ""
            height: 0
            width: 0
            border-top: 50px solid rgba(217, 217, 217, 92)
            border-right: 50px solid transparent
            display: inline-block
            position: absolute
            left: 0
            top: 90%
            bottom: 0
            z-index: -1
</style>

