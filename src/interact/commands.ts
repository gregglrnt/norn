
import { writable } from "svelte/store"
import { increaseDate } from "./navigation"

export const isSearchOpen = writable<boolean>(false)

const commands: Map<KeyboardEvent["key"], () => void> = new Map([
    ['ArrowRight', () => { increaseDate() }],
    ['ArrowLeft', () => increaseDate(-1)],
    ['i', () => isSearchOpen.set(true)]
])

export const listenForCommands = (event: KeyboardEvent) => {
    const command = commands.get(event.key)
    if (command) command()
}