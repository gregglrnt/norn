import { goto } from "$app/navigation"
import { isSearchOpen } from "@/interact/commands"
import { MAXYEAR, MINYEAR, yearOutOfBounds } from "@/stores/date"
import { setPop } from "@/stores/pop"

export const search = (value: number) => {
    const cleanValue = Number(value)
    if (Number.isNaN(cleanValue) || !cleanValue) return //TODO: implement error
    if(yearOutOfBounds(cleanValue)) {
        setPop("error", `Please choose a year between ${MINYEAR} and ${MAXYEAR}`);
        return;
    }
    goto(`/${cleanValue}`);
	isSearchOpen.set(false)
}