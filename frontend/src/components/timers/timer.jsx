import { useState, useEffect, useMemo } from 'react';
import '../../stylesheets/timer.css'

const stringify = num => {
  if (num < 10){
      return "0" + num.toString();
  } else {
      return num;
  }
}

function Timer ({ minutes = 0, seconds = 0, timeUp, alert = false, alertMin = 0, alertSec = 0 } = {}) {
  const [minutesLeft, setMinutesLeft] = useState(minutes);
  const [secondsLeft, setSecondsLeft] = useState(seconds);
  const [alertState, setAlertState] = useState(undefined);

  const target = useMemo (() => (
    new Date().getTime() + minutes*60000 + seconds*1000
  ), [minutes, seconds]);
  const alertTime = useMemo(() => (
    alertMin*60 + alertSec
  ), [alertMin, alertSec]);

  useEffect(() => {
    const updateTime = () => {
      // Add .2 to account for time spent in overhead
      const timeLeft = Math.floor((target - (new Date()))/1000+.2);
      if (alert && timeLeft <= alertTime) setAlertState(true);
      if (timeLeft <= 0) {
        setMinutesLeft(0);
        setSecondsLeft(0);
        if (timeUp) timeUp();
      }
      else {
        setMinutesLeft(Math.floor((timeLeft/60)));
        setSecondsLeft(timeLeft%60);
      }
    }
  
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [target, timeUp, alert, alertTime]);

  return (      
    <span className={alertState && 'alert'}>{minutesLeft}:{stringify(secondsLeft)}</span>
  );
}

export default Timer;
