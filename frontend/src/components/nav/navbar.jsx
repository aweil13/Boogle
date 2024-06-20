import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/sessionActions';
import { openModal } from '../../actions/modalActions';
import '../../stylesheets/navbar.css';

function NavBar () {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.session.isAuthenticated);
  const location = useLocation();

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  // Selectively render links dependent on whether the user is logged in
  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className='session-link' onClick={logoutUser}>
            <Link to='/'>Logout</Link>
        </div>
      );
    } 
    else {
      if (location.pathname === '/login') {
        return (
          <Link className='session-link' to={'/signup'}>Signup</Link>
        );
      } 
      else if (location.pathname === '/signup') {
        return (
          <Link className='session-link' to={'/login'}>Login</Link>
        );
      } 
      else {
        return (
          <>
            <Link className='session-link' to={'/login'}>Login</Link>
            <Link className='session-link' to={'/signup'}>Signup</Link>
          </>
        );
      }
    }
  }

  return (
    <nav>
      <div className='nav-wrapper'>
        <div className='new-game' onClick={() => dispatch(openModal('personal-links'))}>About</div>
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
              <span className='array'>{' 2.0'}</span>
            </div>
          </div>
        </Link>                
        <div className='session-links-wrap'>{getLinks()}</div>
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
              <li><div className='new-game' onClick={() => dispatch(openModal('personal-links'))}>About</div></li>
              <li><div className='session-links-wrap'>{getLinks()}</div></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
