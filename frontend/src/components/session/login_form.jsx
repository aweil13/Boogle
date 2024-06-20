import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../stylesheets/session_form.css';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser === true) {
            this.props.history.push('/');
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
            password: this.state.password
        };

        this.props.login(user);
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
                    <h2 className='form-header'>Login</h2>
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

export default withRouter(LoginForm);