
import { get, writable } from "svelte/store"
import { nextDecade, previousDecade, travel } from "./navigation";

export const isSearchOpen = writable<boolean>(false)

export const toggleWheel = () => {
    const status = get(isSearchOpen)
    isSearchOpen.set(!status);
}

const commands: Map<KeyboardEvent["key"], () => void> = new Map([
    ['ArrowRight', () =>  travel(get(nextDecade)) ],
    ['ArrowLeft', () => travel(get(previousDecade))],
    ['i', () => toggleWheel()]
])

export const listenForCommands = (event: KeyboardEvent) => {
    const command = commands.get(event.key)
    console.log(event.key, command);
    if (command) command()
}