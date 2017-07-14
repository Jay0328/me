
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import App from '../components/App';

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

const AppContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

export default withRouter(AppContainer);
