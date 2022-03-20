import React, { useEffect, useRef, useState } from "react"
import './Timeline.sass'

interface TimelineInterface {
    year: number, 
    beginning: number, 
    end: number,
    setYear: Function
}

export default function Timeline({year, beginning, end, setYear} : TimelineInterface) {
    const [width, setWidth] = useState<string>("")
    const timeline = useRef(document.createElement("div"))
    const range = end - beginning; 

    useEffect(()=> {
        const diff = year - beginning
        setWidth(`${ (diff * 100) / range }%`)
    }, [year])

    function updateDecade(e : any) {
        const newYear = Math.round(beginning + range * (e.clientX / timeline.current.offsetWidth))
        const newDecade = Math.ceil(newYear / 10) * 10
        setYear(newDecade)
    }

    return (
        <div    ref={timeline} 
                id="timeline--container" 
                onClick={updateDecade}
            >
            <div id="timeline--timespent" style={{width: width}}></div>
            <div className="timeline--cursor"></div>
        </div>
    )
}