import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Home from '../components/Home';

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

const HomeContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);

export default withRouter(HomeContainer);
