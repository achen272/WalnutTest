import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {}
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser === true) {
            this.props.history.push('/home');
        }

        this.setState({errors: nextProps.errors})
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        let user = {
            username: this.state.username,
            password: this.state.password
        }

        this.props.login(user);
    }

    renderErrors() {
        return (
            <ul className="form-errors-list">
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`${i}`} className="form-errors">
                       {this.state.errors[error]} 
                    </li>
                ))}
            </ul>
        )
    }

    render() {
        return (
            <div className="login-form">
                <form onSubmit={this.handleSubmit}>
                    <div >
                        <h2 className="form-header"> LOGIN </h2>
                        <input type="text"
                            value={this.state.username}
                            onChange={this.update('username')}
                            placeholder="Username"
                            className="login-input1"
                        />
                        <br />
                        <input type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"
                            className="login-input2"
                        />
                        <br />
                        {this.renderErrors()}
                        <br />
                        <button onClick={this.handleSubmit} className="submit-button">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(LoginForm);