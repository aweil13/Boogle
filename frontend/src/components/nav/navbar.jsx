import React from 'react';
import {Link, withRouter } from 'react-router-dom'
import '../../stylesheets/navbar.scss'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    // Selectively render links dependent on whether the user is logged in
    getLinks() {
        const { location } = this.props
        if (this.props.loggedIn) {
            return (
                <div className='session-links'>
                    <button 
                    className='session-links'
                    onClick={this.logoutUser}>Logout</button>
                </div>
            );
        } else {
            if (location.pathname === '/login') {
                return (
                    <div className='session-links'>
                        <Link to={'/signup'}>Signup</Link>
                    </div>
                );
            } else if (location.pathname === '/signup') {
                return (
                    <div className='session-links'>
                        <Link to={'/login'}>Login</Link>
                    </div>
                );
            } else {
                return (
                    <div className='session-links'>
                        <Link to={'/login'}>Login</Link>
                        <Link to={'/signup'}>Signup</Link>
                    </div>
                );
            }
        }
    }

    render() {
        return (
            <div className='nav-wrapper'>
                <Link to='/board'className='game-header'>Disarray</Link>
                <div className='session-links-wrapper'>{this.getLinks()}</div>
            </div>
        );
    }
}

export default withRouter(NavBar);