import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import { pure } from 'recompose';
import TagLabel from './TagLabel';
import Markdown from './Markdown';
import { themeColor, lightGrey, opacityColor } from './theme/colors';

const styles = {
  articlePreview: {
    padding: '15px 20px',
    margin: '20px 0',
    cursor: 'pointer',
    transition: 'all 0.1s',
    boxShadow: '5px 5px 10px -5px rgba(14, 14, 14, .26)',
    '&:hover': {
      transform: 'scale(1.05, 1.05)',
      boxShadow: `10px 10px 30px -5px ${opacityColor(themeColor, 0.5)}`
    }
  },
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

const ArticlePreview = ({ classes, year, month, day, title, url, tags, preview }) => {
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
      <i className="fa fa-calendar" aria-hidden="true"></i>
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
    <main className={classes.articlePreview}>
      {articleTitle}
      {articleMeta}
      {articleTags}
      {articlePreviewContent}
    </main>
  );
};

ArticlePreview.propTypes = {
  classes: PropTypes.shape().isRequired,
  year: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  preview: PropTypes.string.isRequired
};

export default injectSheet(styles)(pure(ArticlePreview));
