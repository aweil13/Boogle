import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup, receiveErrors } from '../../actions/sessionActions';
import '../../stylesheets/session_form.css';

function SignupForm () {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const dispatch = useDispatch();
  
  const errors = useSelector(state => state.errors.session);

  useEffect(() => {
    return () => dispatch(receiveErrors({}));
  }, [dispatch]);
  
  const update = (setter) => e => setter(e.currentTarget.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(receiveErrors({password: "Passwords must match"}));
      return;
    }

    const user = {
        username,
        password
    };

    dispatch(signup(user));
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
        <h2 className='form-header'>Sign Up</h2>
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

              <input 
                  className='form-input'
                  type="password"
                  value={password2}
                  onChange={update(setPassword2)}
                  placeholder="Confirm Password"
              />
            </div>
            <input className='submit' type="submit" value="Submit" />
          </div>
          <div>{renderErrors()}</div>
        </form>
      </div>
    </main>
  );
}

export default SignupForm;
