import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../stylesheets/splash.css';
import '../../stylesheets/main.css';
import '../../stylesheets/reset.css';


class MainPage extends React.Component {

    render() {
        return (
            <div className='splash-page'>
                <NavLink to='/board' className='start'>Click to Start</NavLink>
            </div>
        );
    }
}

export default MainPage;