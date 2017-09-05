import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Tags from '../components/Tags';
import { fetchTagsIfNeed } from '../actions/tagsActions';

const mapStateToProps = state => ({
  tags: state.get('tags').toObject()
});

const mapDispatchToProps = dispatch => ({
  fetchTags() {
    dispatch(fetchTagsIfNeed());
  }
});

const TagsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tags);

export default withRouter(TagsContainer);
