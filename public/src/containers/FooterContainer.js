import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Footer from '../components/Footer';
import { logout } from '../actions/authActions';

const mapStateToProps = (state) => ({
  isAuth: state.getIn(['auth', 'isAuthenticated']),
});

const mapDispatchToProps = (dispatch) => ({
  logout: e => {
    e.preventDefault();
    dispatch(logout());
  }
});

const FooterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);

export default withRouter(FooterContainer);
