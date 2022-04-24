import { useEffect, useRef, useState } from "react";
import { HistoricalEvent } from "../types/HistoricalEvent.type";

/**
 * 
 * @param year : the current year we want to filter
 * @returns HistoricalEvent[] | undefined
 */
export function useWorldHistory (year : number, previousYear: number | undefined) : Map<number, HistoricalEvent> | undefined {
    let currentYear = year;
    if(previousYear && year < previousYear) {
        currentYear = year-100;
    }
    const century = Math.round(currentYear / 100) * 100;
    const centuryDictionnary = useRef<Set<number>>(new Set<number>().add(century)) 
    const [worldHistory, setWorldHistory] = useState<Map<number, HistoricalEvent>>();
    const events = useRef<Map<number, HistoricalEvent>>(new Map<number, HistoricalEvent>());

    // on fetch si l'Histoire est vide ou le siècle voulu n'est pas dans l'Histoire : 
    if(!centuryDictionnary.current.has(century) || !worldHistory) {
        console.log("fetch " +  century);
        fetch(`http://localhost/api/events/${century}`)
            .then(res => res.json())
            .then((datas) => 
            {
                let history = new Map();
                if(worldHistory) {
                    history = new Map(worldHistory)
                }
                for(let data of datas) {
                    history.set(data.id, data)  
                }
                setWorldHistory(history);
            })
    }

    centuryDictionnary.current.add(century);

    // TRI DES EVENTS

    useEffect(()=> {
        if(worldHistory){
        let thatYear = new Map<number, HistoricalEvent>()
        for(let event of worldHistory.values()) {
            if(year - 15 <= event.date && event.date <= year + 15) {
                thatYear.set(event.id, event)
            }
        }
        events.current = new Map([...thatYear].sort((a, b) => + (a[1].date >= b[1].date)))
    }
    }, [year]); 

    return events.current;

}

