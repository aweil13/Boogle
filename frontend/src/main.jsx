import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import configureStore from './store';
import { jwtDecode } from 'jwt-decode';
import { setAuthToken, getUser } from './util/session_api_util';
import { logout, receiveCurrentUser, receiveErrors } from './actions/sessionActions';


const store = configureStore();

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decodedUser = jwtDecode(localStorage.jwtToken);
  getUser(decodedUser.id).then(res => {
    store.dispatch(receiveCurrentUser(res.data))
  }) 
  .catch(err => (
    store.dispatch(receiveErrors(err.response.data))
  )); 
  
  const currentTime = Date.now() / 1000;

  if (decodedUser.exp < currentTime) {
    store.dispatch(logout());
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
