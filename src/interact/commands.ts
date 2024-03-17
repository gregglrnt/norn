
import { get, writable } from "svelte/store"
import { increaseDecade } from "./navigation"

export const isSearchOpen = writable<boolean>(false)

export const toggleWheel = () => {
    const status = get(isSearchOpen)
    isSearchOpen.set(!status);
}

const commands: Map<KeyboardEvent["key"], () => void> = new Map([
    ['ArrowRight', () => { increaseDecade() }],
    ['ArrowLeft', () => increaseDecade(-1)],
    ['i', () => toggleWheel()]
])

export const listenForCommands = (event: KeyboardEvent) => {
    const command = commands.get(event.key)
    if (command) command()
}