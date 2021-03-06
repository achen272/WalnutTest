import {connect} from 'react-redux';
import {logout} from '../../actions/session_actions';
import NavBar from './navbar';

const mapStateToProps = state => {
    return {
        user: state.session.user,
        loggedIn: state.session.isAuthenticated
    }
}

export default connect(mapStateToProps, {logout})(NavBar);