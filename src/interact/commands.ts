
import { writable } from "svelte/store"
import { increaseDecade } from "./navigation"

export const isSearchOpen = writable<boolean>(false)

const commands: Map<KeyboardEvent["key"], () => void> = new Map([
    ['ArrowRight', () => { increaseDecade() }],
    ['ArrowLeft', () => increaseDecade(-1)],
    ['i', () => isSearchOpen.set(true)]
])

export const listenForCommands = (event: KeyboardEvent) => {
    const command = commands.get(event.key)
    if (command) command()
}