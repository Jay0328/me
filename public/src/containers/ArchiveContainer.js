import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Archive from '../components/Archive';
import { fetchArchiveIfNeed } from '../actions/archiveActions';

const mapStateToProps = state => ({
  archive: state.getIn(['archive', 'archive']).toObject(),
  totalArticlesCount: state.getIn(['archive', 'totalArticlesCount'])
});

const mapDispatchToProps = dispatch => ({
  fetchArchive() {
    dispatch(fetchArchiveIfNeed());
  }
});

const ArchiveContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Archive);

export default withRouter(ArchiveContainer);
