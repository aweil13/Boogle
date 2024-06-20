import React from 'react';
import {Link, withRouter } from 'react-router-dom'
import '../../stylesheets/navbar.css'

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
                <div className='session-link' onClick={this.logoutUser}>
                    <Link 
                    to='/'
                    >Logout</Link>
                </div>
            );
        } else {
            if (location.pathname === '/login') {
                return (
                    <Link className='session-link' to={'/signup'}>Signup</Link>
                );
            } else if (location.pathname === '/signup') {
                return (
                    <Link className='session-link' to={'/login'}>Login</Link>
                );
            } else {
                return (
                    <>
                        <Link className='session-link' to={'/login'}>Login</Link>
                        <Link className='session-link' to={'/signup'}>Signup</Link>
                    </>
                );
            }
        }
    }

    render() {
        return (
            <nav>
                <div className='nav-wrapper'>
                    <div className='new-game' onClick={() => this.props.openModal('personal-links')}>About</div>
                    <Link to='/'className='game-header'>
                        <span className='d'>D</span>
                        <div className='end-wrap'>
                            <div className='stacked'>
                                <span className='is'>is</span>
                                <span className='array'>arr</span>
                            </div>
                            <div className='last-two'>
                                <span className='a'>a</span>
                                <span className='y'>y</span>
                            </div>
                        </div>
                    </Link>                
                    <div className='session-links-wrap'>{this.getLinks()}</div>
                </div>
                
                <div className='nav-wrapper burger'>
                    <div className='nav-spacer'></div>
                    <Link to='/' className='game-header'>
                        <span className='d'>D</span>
                        <div className='end-wrap'>
                            <div className='stacked'>
                                <span className='is'>is</span>
                                <span className='array'>arr</span>
                            </div>
                            <div className='last-two'>
                                <span className='a'>a</span>
                                <span className='y'>y</span>
                            </div>
                        </div>
                    </Link>
                    <ul className='burger-dropdown'>
                        <li>
                            <ul className='burger-list'>
                                <li><div className='new-game' onClick={() => this.props.openModal('personal-links')}>About</div></li>
                                <li><div className='session-links-wrap'>{this.getLinks()}</div></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default withRouter(NavBar);