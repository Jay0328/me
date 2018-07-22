import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import TagArticle from 'Molecules/TagArticle';
import styles from './styles';

@injectSheet(styles)
class TagArticles extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    filter: PropTypes.string.isRequired
  }

  showTag = ({ tagName }) => {
    const { filter } = this.props;
    return !filter || filter === tagName.replace(' ', '');
  }

  renderTagArticle = ({ tagName, articles }) => (
    <TagArticle
      key={tagName}
      tagName={tagName}
      articles={articles}
    />
  )

  render() {
    const { classes, tags } = this.props;
    return (
      <main className={classes.lists}>
        {
          tags
            .filter(this.showTag)
            .map(this.renderTagArticle)
        }
      </main>
    );
  }
}

export default TagArticles;
