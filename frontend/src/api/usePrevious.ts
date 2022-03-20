import { useEffect, useRef } from "react";

export default function usePrevious<T>(value : T | undefined){
    const ref = useRef<T>();
    useEffect(()=>{
        ref.current = value;
    }, [value]);
    return ref.current;
}