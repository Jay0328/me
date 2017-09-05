import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';
import AboutMe from './AboutMe';
import TagLabel from './TagLabel';

const Header = ({ mode, date, title, tags }) => {
  let headerContent = null;
  if (mode === 'default') headerContent = <AboutMe />;
  else if (mode === 'tags') headerContent = <div className="header-content">Tags</div>;
  else if (mode === 'article') {
    headerContent = (
      <div className="header-content">
        <h2 className="article-title">{title}</h2>
        <div className="article-meta">{date}</div>
        <div className="article-tags">
          {tags.map(({ tagName }) => (
            <TagLabel key={tagName} mode={'cloud'} tagName={tagName} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <header>
      {headerContent}
    </header>
  );
};

Header.propTypes = {
  mode: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.shape())
};

Header.defaultProps = {
  mode: 'default',
  date: '',
  title: '',
  tags: []
};

export default pure(Header);
