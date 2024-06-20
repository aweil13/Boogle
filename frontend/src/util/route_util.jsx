import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const AuthRoute = ({ component: Component, ...props }) => {
  const loggedIn = useSelector(state => state.session.isAuthenticated );
  
  return (
    !loggedIn ?
      <Component {...props} /> :
      <Navigate to="/board" replace={true}/>
  );
};

export const ProtectedRoute = ({ component: Component, ...props }) => {
  const loggedIn = useSelector(state => state.session.isAuthenticated );

  return (
    loggedIn ?
      <Component {...props} /> :
      <Navigate to="/board" replace={true} />
  );
};
