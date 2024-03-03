// import { year } from "@/stores/date";
// import { get } from "svelte/store";

import { browser } from "$app/environment";
import { year } from "@/stores/date";
import { get } from "svelte/store";

export const addLike = () => {
    if(!browser) return false;
    const y = get(year);
    const favorites = getFavoriteYears()
    if(removeLike(y)) return false;
    favorites.push(y);
    localStorage.setItem("liked_years", JSON.stringify(favorites));
    return true;
}

export const removeLike = (year: string) => {
    const favorites = getFavoriteYears();
    const yearInFavorites = favorites.indexOf(year);
    if(yearInFavorites === -1) return false;
    favorites.splice(yearInFavorites, 1);
    localStorage.setItem("liked_years", JSON.stringify(favorites));
    return true;
}

export const getFavoriteYears = () : string[] => {
    if(!browser) return [];
    const storage = localStorage.getItem("liked_years");
    if(storage) {
        return JSON.parse(storage);
    }
    localStorage.setItem("liked_years", JSON.stringify([]));
    return [];
}

export const isFavorite = (year: string) : boolean => {
    const list = getFavoriteYears();
    if(list.indexOf(year) === -1) {
        return false;
    }
    return true; 
}