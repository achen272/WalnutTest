import React from 'react';
import { Link } from 'react-router-dom';
import HomePage from '../home/home_page';

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

    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div className="user-logout">
                    <HomePage user={this.props.user.name} />
                    <button onClick={this.logoutUser} className="welcome-buttons1">logout</button>
                </div>
            ) 
        } else {
            return (
                <div className="user-buttons">
                    <Link to={'/signup'} style={{ textDecoration: 'none', color: 'black'}}>
                        <button className="welcome-buttons1">Signup</button>
                    </Link>
                    <Link to={'/login'} style={{ textDecoration: 'none', color: 'black'}}>
                        <button className="welcome-buttons2">Login</button>
                    </Link>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="nav-bar">
                <div className="nav-header">
                    <Link to={'/'} style={{ textDecoration: 'none'}}><h1 className="nav-title">Walnut</h1></Link>
                </div>
                { this.getLinks() }
            </div>
        )
    }
}

export default NavBar;

