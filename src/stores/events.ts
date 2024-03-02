import type { Fact } from '@/types/fact'
import { writable } from 'svelte/store'

export const events = writable<Fact[]>([])

export const currentEvent = writable<number>()
