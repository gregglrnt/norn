import { get, writable } from "svelte/store";
import { travel } from "./navigation";
import { year } from "@/stores/date";

export const playing = writable<ReturnType<typeof setTimeout> | undefined>();

export const playHistory = () => {
    const timer = setInterval(() => travel(get(year) + 1), 500);
    playing.set(timer);
}

export const pauseHistory = () => {
    clearInterval(get(playing));
    playing.set(undefined)
}