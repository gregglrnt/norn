import { goto } from "$app/navigation"

export const search = (value: number) => {
    const cleanValue = Number(value)
    if (Number.isNaN(cleanValue) || !cleanValue) return //TODO: implement error
    goto(`/${cleanValue}`)
}