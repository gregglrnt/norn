import { get, writable } from "svelte/store";
import { increaseDate } from "./navigation";

export const playing = writable<ReturnType<typeof setTimeout> | undefined>();

export const playHistory = () => {
    const timer = setInterval(() => increaseDate(1), 500);
    playing.set(timer);
}

export const pauseHistory = () => {
    clearInterval(get(playing));
    playing.set(undefined)
}