import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { withRouter } from 'react-router';
import RoutePage from 'Layouts/RoutePage';
import ConnectWithToJS from 'Layouts/ConnectWithToJS';
import TagsCloud from 'Molecules/TagsCloud';
import TagArticles from 'Molecules/TagArticles';
import { fetchTagsIfNeed } from 'Actions/tagsActions';
import styles from './styles';

const mapStateToProps = state => ({
  tags: state.get('tags')
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchTagsIfNeed())
});

@withRouter
@ConnectWithToJS(mapStateToProps, mapDispatchToProps)
@RoutePage({
  title: ({ match }) => match.params.tag || 'Tags'
})
@injectSheet(styles)
class Tags extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    match: PropTypes.shape().isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape()).isRequired
  }

  render() {
    const { classes, tags, match } = this.props;
    const filter = match.params.tag || '';
    return (
      <main className={classes.tags}>
        <TagsCloud tags={tags} />
        <TagArticles
          tags={tags}
          filter={filter}
        />
      </main>
    );
  }
}

export default Tags;
