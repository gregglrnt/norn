import React from "react";
import './Chronicle.css';

type ChronicleInterface = {
    id: number,
    title : string,
    children ?: JSX.Element | JSX.Element[],
    color ?: string,
}

export default function Chronicle({id, title, children, color = '#fc3903'} : ChronicleInterface) {
    const style = {
        borderTop: `6px solid #${color}` 
    }
    return(
        <article id={id.toString()} className="chronicle" style={style}>
            <h2>{title}</h2>
            {children}
        </article>
    )
}