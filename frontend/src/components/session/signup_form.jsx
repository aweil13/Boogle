import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../stylesheets/session_form.css';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            password2: '',
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearedErrors = false;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.signedIn === true) {
            this.props.history.push('/login');
        }

        this.setState({ errors: nextProps.errors })
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let user = {
            username: this.state.username,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.signup(user, this.props.history);
    }

    renderErrors() {
        return (
            <ul className='errors'>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <main className='main-wrapper'>
                <div className='form-wrapper'>
                    <h2 className='form-header'>Sign Up</h2>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <div className='input-wrapper'>
                            <div className='fields'>
                            <input 
                                className='form-input'
                                type="text"
                                value={this.state.username}
                                onChange={this.update('username')}
                                placeholder="Username"
                            />
                            
                            <input
                                className='form-input'
                                type="password"
                                value={this.state.password}
                                onChange={this.update('password')}
                                placeholder="Password"
                            />
                            
                            <input 
                                className='form-input'
                                type="password"
                                value={this.state.password2}
                                onChange={this.update('password2')}
                                placeholder="Confirm Password"
                            />
                            </div>
                            <input className='submit'
                            type="submit" value="Submit" />
                        </div>
                        <div>{this.renderErrors()}</div>
                    </form>
                </div>
            </main>
        );
    }
}

export default withRouter(SignupForm);