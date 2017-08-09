import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ArticlePreview = ({ year, month, day, title, url }) => {
  return (
    <div className="article-preview">
      <Link to={`/${year}/${month}/${day}/${url}`}>
        <h2 className="article-title">
          {title}
        </h2>
        <p className="article-meta">
          <i className="fa fa-calendar" aria-hidden="true"></i>
          {`${year}-${month}-${day}`}
        </p>
      </Link>
    </div>
  );
};

ArticlePreview.propTypes = {
  year: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

ArticlePreview.defaultProps = {
};

export default ArticlePreview;
