import { writable } from "svelte/store";

export const userLikes = writable<Set<string>>(new Set());