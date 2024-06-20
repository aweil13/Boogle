import Timer from './timer';
import '../../stylesheets/timer.css'

function RoundTimer ({ timeUp }) {
  return (
    <div className='timer-container'>
      <div className='timer-header'>Timer</div>
      <Timer minutes={1} timeUp={timeUp} alert={true} alertSec={10} />
    </div>
  );
}

export default RoundTimer;
