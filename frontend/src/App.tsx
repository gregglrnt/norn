import React, { useEffect, useState, Suspense } from 'react'
import Globe from './components/Globe'
import Chronicle from './components/Chronicle'
import './App.sass';
import Pin from './components/Pin';
import { useWorldHistory } from './api/events';
import usePrevious from './api/usePrevious';
import { HistoricalEvent } from './types/HistoricalEvent.type';

function App() {
  const beginning = -800
  const end = 2020
  const [decade, setDecade] = useState<number>(1510);
  const [points, setPoints] = useState<Pin[]>()
  const previousDecade = usePrevious(decade);
  const worldHistory = useWorldHistory(decade, previousDecade)
  const [events, setEvents] = useState<Map<number, HistoricalEvent> | undefined>()
  const [focus, setFocus] = useState<string | undefined>()
  
  // on écoute le decade pour charger les évènements
  useEffect(() => {
    const apiEvents = worldHistory;
    if(apiEvents) setEvents(apiEvents)
  }, [worldHistory])

  // Génération de pins
  useEffect(()=> {
    let pins : Pin[] = [];
    events && events.forEach((event)=> {
      pins.push(new Pin(event));
    });
    setPoints(pins);
  }, [events]);

  useEffect(()=> {
    // Update de l'année grâce au clavier
    document.addEventListener('keydown', (e) => {
      if(e.key === 'ArrowRight'){
        e.preventDefault();
        if((decade+20) <= end) setDecade(decade => decade+20);

      }
      if(e.key == 'ArrowLeft') {
        e.preventDefault();
        if((decade-20) >= beginning) setDecade(decade => decade-20);
      }
    })
  }, [])


  return (
    <div className="App">
    <header>
      <h1> <span>Norn</span> - A timeline of events </h1>
      <h2 className='neon-title'> Welcome in the <span className='decade'>{decade}</span>s ! </h2>
     {/*<Timeline beginning={beginning} end={end} year={decade} setYear={setDecade}/>*/}
      <input  id="timeline-html-ranger"
              type="range"
              min={beginning.toString()} max={end.toString()}       
              step="20" 
              value={decade} 
              style={{width:'100%'}} 
              onChange={(e) => setDecade(parseInt(e.target.value))
              }/>
    </header>
    <main id="app">
    
      <Globe pins={points} handlePins={setPoints} focus={focus} setFocus={setFocus}/>
      <div className="chronicles">
        <header>
          <h2 className='neon-title orange'> Today's news </h2>
          <small> Brought to you by <b>gregglrnt</b> </small>
        </header>
        {
          events && [...events.values()].map((event) => {
            let color = 'ffffff';
            if(event.country) color = (event.country.id*500000).toString(16);
            return (
              <Chronicle  id={event.id}
                          key={event.id}
                          title={event.name}
                          color={color}
                          onClick={(e) => {
                            for (let otherChronicle of document.querySelectorAll('.chronicle')) {
                              otherChronicle.classList.remove('selected')
                            }
                            e.currentTarget.classList.add('selected')
                            setFocus(e.currentTarget.id)}
                          }
                        >
                <small> {event.date} </small>
                <small> {event.country?.name} </small>
                <p> {event.description} </p>
              </Chronicle>
            )
          })
        }
      </div>
    </main>
    {/*<button id="timeline-key-left" onClick={() => setDecade(decade-20)}>
        {'<'}
        <small> {decade - 10} </small>
    </button>
    <button id="timeline-key-right" onClick={()=> setDecade(decade+20)}>
        {'>'}
        <small> {decade + 10} </small>
      </button>*/}
    </div>
  );
}

export default App;
