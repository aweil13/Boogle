import { NavLink } from 'react-router-dom';
import '../../stylesheets/reset.css';
import '../../stylesheets/splash.css';
import '../../stylesheets/main.css';


function MainPage () {
  return (
    <div className='splash-page'>
      <NavLink to='/game' className='start'>Click to Start</NavLink>
    </div>
  );
}

export default MainPage;
