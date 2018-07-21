import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import Card from 'Components/atoms/Card';
import TagLabel from 'Components/atoms/TagLabel';
import Markdown from 'Components/molecules/Markdown';
import { themeColor, lightGrey } from 'Theme/colors';
import styles from './styles';

@injectSheet(styles)
class ArticlePreview extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    className: PropTypes.string,
    year: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    preview: PropTypes.string
  }

  static defaultProps = {
    className: '',
    preview: ''
  }

  render() {
    const { classes, className, year, month, day, title, url, tags, preview } = this.props;
    const link = `/${year}/${month}/${day}/${url}/`;
    const articleTitle = (
      <Link
        className={classes.title}
        to={link}
      >
        {title}
      </Link>
    );
    const articleMeta = (
      <Link
        className={classes.meta}
        to={link}
      >
        <i className="far fa-calendar-alt" aria-hidden="true"></i>
        {`${year}/${month}/${day}`}
      </Link>
    );
    const articleTags = (
      <section className={classes.tags}>
        {tags.map(({ tagName }) => (
          <TagLabel
            key={tagName}
            tagName={tagName}
            color={lightGrey}
            hoverColor={themeColor}
            backgroundColor="white"
            borderColor={lightGrey}
            hoverBorderColor={themeColor}
          />
        ))}
      </section>
    );
    const articlePreviewContent = preview ? (
      <Markdown content={preview} />
    ) : null;

    return (
      <Card className={className}>
        {articleTitle}
        {articleMeta}
        {articleTags}
        {articlePreviewContent}
      </Card>
    );
  }
}

export default ArticlePreview;
