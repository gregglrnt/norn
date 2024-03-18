import { writable } from "svelte/store";

type PopStatus = "success" | "error";

export const setPop = (status: PopStatus, message: string) => {
    pop.set({status, message})
}

export const pop = writable<{status: PopStatus, message: string} | null>(null)