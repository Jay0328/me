import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Archives from '../components/Archives';
import { fetchArchivesIfNeed } from '../actions/archivesActions';

const mapStateToProps = state => ({
  archives: state.getIn(['archives', 'archives']).toObject(),
  totalArticlesCount: state.getIn(['archives', 'totalArticlesCount'])
});

const mapDispatchToProps = dispatch => ({
  fetchArchives() {
    dispatch(fetchArchivesIfNeed());
  }
});

const ArchivesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Archives);

export default withRouter(ArchivesContainer);
