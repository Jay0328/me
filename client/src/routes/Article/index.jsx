import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { withRouter } from 'react-router';
import RoutePage from 'Layouts/RoutePage';
import ConnectWithToJS from 'Layouts/ConnectWithToJS';
import Markdown from 'Components/molecules/Markdown';
import { fetchArticleIfNeed } from 'Actions/articleActions';
import styles from './styles';

const mapStateToProps = state => ({
  title: state.getIn(['article', 'title']),
  content: state.getIn(['article', 'content'])
});

const mapDispatchToProps = dispatch => ({
  fetchData(props) {
    const { year, month, day, url } = props.match.params;
    dispatch(fetchArticleIfNeed({ year, month, day, url }));
  }
});

@withRouter
@ConnectWithToJS(mapStateToProps, mapDispatchToProps)
@RoutePage({
  title: ({ title }) => title
})
@injectSheet(styles)
class Article extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    content: PropTypes.string.isRequired
  }

  render() {
    const { classes, content } = this.props;
    return (
      <main className={classes.article}>
        <Markdown className="article-content" content={content} />
      </main>
    );
  }
}

export default Article;
