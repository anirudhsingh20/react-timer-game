import { useEffect, useRef, useState } from "react";

function Timer({time, onTimerEnd, children}) {
    let timerInternval = useRef(null);
    let timeLeft = useRef(time * 1000);
    const [isStart, setIsStart] = useState(false);

    useEffect(()=>{
        return ()=>{
            clearInterval(timerInternval)
        }
    })

    function handleClick() {
        if (isStart) {
            clearInterval(timerInternval.current)
            onTimerEnd(getScore());
        } else {
            createSetInterval();
        }
        setIsStart(!isStart);
    }

    function getScore() {
        console.log(timeLeft.current/ 1000);
        return parseFloat((1 - timeLeft.current / (time * 1000)) * 100).toFixed(2);
    }

    function createSetInterval() {
        timeLeft.current = time * 1000;
        timerInternval.current = setInterval(()=> {
            timeLeft.current -= 10
            if (timeLeft.current <= 0) {
                clearInterval(timerInternval.current);
                onTimerEnd(0);
                setIsStart(!setIsStart);
            }
        }, 10);
    }

    return ( 
        <div className="timer-card">
            <h2>{children}</h2>
            <h3>{time}s Time</h3>
            <small className="game-text">{isStart ? 'Time is running...': `Stop the Timer before ${time} second${time > 1 ? 's' : ''} `}</small>
            <button onClick={handleClick} className="game-btn">{isStart ? 'Stop' : 'Start'}</button>
        </div>
     );
}

export default Timer;