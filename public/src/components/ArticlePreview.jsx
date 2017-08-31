import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TagLabel from './TagLabel';

const ArticlePreview = ({ year, month, day, title, url, tags, intro }) => {
  const articleTitle = (
    <Link to={`/${year}/${month}/${day}/${url}`} className="article-title">
      {title}
    </Link>
  );
  const articleMeta = (
    <Link to={`/${year}/${month}/${day}/${url}`} className="article-meta">
      <i className="fa fa-calendar" aria-hidden="true"></i>
      {`${year}-${month}-${day}`}
    </Link>
  );
  const articleTags = (
    <div className="article-tags">
      {tags.map(({ tagName }) => (
        <TagLabel key={tagName} mode={'cloud'} tagName={tagName} />
      ))}
    </div>
  );
  const articleIntro = (
    <p className="article-intro">
      {intro}
    </p>
  );

  return (
    <div className="article-preview">
      {articleTitle}
      {articleMeta}
      {articleTags}
      {articleIntro}
    </div>
  );
};

ArticlePreview.propTypes = {
  year: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  intro: PropTypes.string.isRequired
};

ArticlePreview.defaultProps = {
};

export default ArticlePreview;
