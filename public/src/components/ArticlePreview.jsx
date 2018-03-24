import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import { pure } from 'recompose';
import Card from './Card';
import TagLabel from './TagLabel';
import Markdown from './Markdown';
import { themeColor, lightGrey } from './theme/colors';

const styles = {
  link: {
    display: 'block',
    textDecoration: 'none',
    width: 'fit-content',
    margin: '10px 0',
    paddingLeft: '5px',
    color: 'black',
    '&:hover': {
      color: themeColor
    }
  },
  title: {
    extend: 'link',
    fontSize: '26px',
    fontWeight: '800'
  },
  meta: {
    extend: 'link',
    '& > i': {
      marginRight: '5px'
    }
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap'
  }
};

const ArticlePreview = ({ classes, className, year, month, day, title, url, tags, preview }) => {
  const articleTitle = (
    <Link
      className={classes.title}
      to={`/${year}/${month}/${day}/${url}/`}
    >
      {title}
    </Link>
  );
  const articleMeta = (
    <Link
      className={classes.meta}
      to={`/${year}/${month}/${day}/${url}/`}
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
  const articlePreviewContent = (
    <Markdown content={preview} />
  );

  return (
    <Card className={className}>
      {articleTitle}
      {articleMeta}
      {articleTags}
      {articlePreviewContent}
    </Card>
  );
};

ArticlePreview.propTypes = {
  classes: PropTypes.shape().isRequired,
  className: PropTypes.string,
  year: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  preview: PropTypes.string
};

ArticlePreview.defaultProps = {
  className: '',
  preview: ''
};

export default injectSheet(styles)(pure(ArticlePreview));
