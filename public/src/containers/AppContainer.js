import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import App from '../components/App';
import { logout } from '../actions/authActions';

const mapStateToProps = (state) => ({
  isAuth: state.getIn(['auth', 'isAuthenticated']),
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => e => {
    e.preventDefault();
    dispatch(logout());
  }
});

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default withRouter(AppContainer);
