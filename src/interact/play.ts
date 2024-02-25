import { increaseDate } from "./navigation";

let playlistID : NodeJS.Timeout;

export const playHistory = () => {
    pauseHistory();
    playlistID = setInterval(() => increaseDate(1), 500)
}
export const pauseHistory = () => {
    if(playlistID) clearInterval(playlistID)
}

