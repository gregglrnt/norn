import React, { useEffect, useRef, useState } from 'react'
import Globe from './components/Globe'
import Chronicle from './components/Chronicle'
import './App.css';
import { HistoricalEvent } from './types/HistoricalEvent.type';
import Pin from './components/Pin';
import { useWorldHistory } from './api/events';
import usePrevious from './api/usePrevious';

function App() {
  const [decade, setDecade] = useState<number>(1510);
  const [points, setPoints] = useState<Pin[]>()
  const previousDecade = usePrevious(decade);
  const events = useWorldHistory(decade, previousDecade);
  
  useEffect(()=> {
    if(points) for (let point of points) point.destroy();
    let pins : Pin[] = [];
    events?.forEach((event)=> {
      pins.push(new Pin(event));
    });
    setPoints(pins);
  }, [events]);

  useEffect(()=> {
    document.addEventListener('keydown', (e) => {
      if(e.key === 'ArrowRight'){
        e.preventDefault();
        setDecade(decade => decade+20);
      }
      if(e.key == 'ArrowLeft') {
        e.preventDefault();
        setDecade(decade => decade-20);
      }
    })
  }, [])

  return (
    <div className="App">
    <header>
      <h1> Welcome in {decade} ! </h1>
      <input  type="range"
              min="-800" max="2020"       
              step="20" 
              value={decade} 
              style={{width:'100%'}} 
              onChange={(e) => setDecade(parseInt(e.target.value))
              }/>
    </header>
    <main id="app">
      <div>
        <Globe pins={points} handlePins={setPoints}/>
      </div>
      <div className="chronicles">
        {
          events && events.map((event) => {
            let color = 'ffffff';
            if(event.country) color = (event.country.id*500000).toString(16);
            return (
              <Chronicle id={event.id} key={event.id} title={event.name} color={color}>
                <small> {event.date} </small>
                <small> {event.country?.name} </small>
                <p> {event.description} </p>
              </Chronicle>
            )
          })
        }
      </div>
    </main>
    </div>
  );
}

export default App;
