import { useEffect, useRef, useState } from "react";
import { HistoricalEvent } from "../types/HistoricalEvent.type";

/**
 * 
 * @param year : the current year we want to filter
 * @returns HistoricalEvent[] | undefined
 */
export function useWorldHistory (year : number, previousYear: number | undefined) : HistoricalEvent[] | undefined {
    if(previousYear && year < previousYear) {
        year = year-100;
    }
    const century = Math.round(year / 100) * 100;
    const centuryDictionnary = useRef<Set<number>>(new Set<number>().add(century)) 
    const [worldHistory, setWorldHistory] = useState<HistoricalEvent[]>();
    const events = useRef<HistoricalEvent[]>();

    // on fetch si l'Histoire est vide ou le siècle voulu n'est pas dans l'Histoire : 
    if(!centuryDictionnary.current.has(century) || !worldHistory) {
        console.log("fetch " + century);
        fetch(`http://localhost/api/events/${century}`)
            .then(res => res.json())
            .then((data) => 
            {
                if(worldHistory) {
                    let history = worldHistory.slice();
                    history.push(...data);
                    setWorldHistory(history);}
                else {
                    setWorldHistory(data);
                }
            })
    }

    centuryDictionnary.current.add(century);

    // TRI DES EVENTS

    useEffect(()=> {
        if(worldHistory){
        /*for(let event of worldHistory) {
                if((year+10)>=event.date && event.date >=(year-10)) {
                    events.current.set(event.id, event);
                }
        }*/
        let evts = new Map(worldHistory.filter((e) => {
            return (year+10) >= e.date && e.date >=(year-10);
            } 
        ).map(i => [i.id, i]));
        events.current = Array.from(evts.values(), (e) => e)
    }
    }, [year, worldHistory]);   
    return events.current;

}

