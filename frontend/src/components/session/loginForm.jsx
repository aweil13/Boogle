import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/sessionActions';
import '../../stylesheets/session_form.css';

function LoginForm () {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const errors = useSelector(state => state.errors.session);
  
  const update = (setter) => e => setter(e.currentTarget.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username,
      password
    };
    return dispatch(login(user));
  }

  const renderErrors = () => {
    return (
      <ul className='errors'>
        {Object.keys(errors).map((error, i) => (
          <li key={`error-${i}`}>
            {errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <main className='main-wrapper'>
      <div className='form-wrapper'>
        <h2 className='form-header'>Login</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className='input-wrapper'>
            <div className='fields'>
            <input 
              className='form-input'
              type="text"
              value={username}
              onChange={update(setUsername)}
              placeholder="Username"
            />
        
            <input 
              className='form-input'
              type="password"
              value={password}
              onChange={update(setPassword)}
              placeholder="Password"
            />
            </div>
            <input className='submit'
            type="submit" value="Submit" />
          </div>
          <div>{renderErrors()}</div>
        </form>
      </div>
    </main>
  );
}

export default LoginForm;
