import { writable } from 'svelte/store'
import type { Chronicle } from '@/types/chronicle'

export const events = writable<Chronicle[]>([])
