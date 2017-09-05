import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { pure } from 'recompose';
import TagLabel from './TagLabel';
import Markdown from './Markdown';

const ArticlePreview = ({ year, month, day, title, url, tags, preview }) => {
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
  const articlePreviewContent = <Markdown className="article-preview-content" content={preview} />;
  const moreBtn = (
    <Link to={`/${year}/${month}/${day}/${url}`} className="article-more-btn">
      繼續閱讀
    </Link>
  );

  return (
    <div className="article-preview">
      {articleTitle}
      {articleMeta}
      {articleTags}
      {articlePreviewContent}
      {moreBtn}
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
  preview: PropTypes.string.isRequired
};

export default pure(ArticlePreview);
