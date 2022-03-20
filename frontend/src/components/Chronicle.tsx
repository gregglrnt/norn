import React, { MouseEventHandler } from "react";
import './Chronicle.sass';

type ChronicleInterface = {
    id: number,
    title : string,
    children ?: JSX.Element | JSX.Element[],
    color ?: string,
    onClick: MouseEventHandler,
}

export default function Chronicle({id, title, children, color = 'fc3903', onClick} : ChronicleInterface) {


    return(
        <article id={`event_${id.toString()}`} className="chronicle" onClick={onClick}>
            <i style={{ backgroundColor: '#' + color}}></i>
            <h2>{title}</h2>
            {children}
        </article>
    )
}