import React from 'react';
import { withRouter } from 'react-router-dom';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            username: '',
            password: '',
            password2: '',
            errors: {}
        }

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
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        let user = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
            password2: this.state.password2
        }

        this.props.signup(user, this.props.history);
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
        return(
            <div className="signin-form">
                <form onSubmit={this.handleSubmit}>
                    <h2 className="form-header"> SIGN IN </h2>
                    <input type="text"
                        value={this.state.name}
                        onChange={this.update('name')}
                        placeholder="Name"
                        className="signin-input1"
                    />
                    <br />
                    <input type="text"
                        value={this.state.username}
                        onChange={this.update('username')}
                        placeholder="Username"
                        className="signin-input2"
                    />
                    <br />
                    <input type="password"
                        value={this.state.password}
                        onChange={this.update('password')}
                        placeholder="Password"
                        className="signin-input3"
                    />
                    <br />
                    <input type="password"
                        value={this.state.password2}
                        onChange={this.update('password2')}
                        placeholder="Confirm Password"
                        className="signin-input4"
                    />
                    <br />
                    {this.renderErrors()}
                    <button onClick={this.handleSubmit} className="submit-button">Submit</button>
                </form>
            </div>
        )
    }
}

export default withRouter(SignupForm);

