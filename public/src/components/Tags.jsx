import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './Header';
import Profile from './Profile';
import TagLabel from './TagLabel';

class Tags extends React.PureComponent {
  constructor(props) {
    super(props);
    this.props.fetchTags();
  }

  render() {
    const { tags } = this.props;
    return (
      <section className="tags">
        <Header />
        <div className="container">
          <div className="tags-container">
            <div className="tags-labels">
              {Object.keys(tags).map(tagName => (
                <TagLabel key={tagName} mode={'cloud'} tagName={tagName} articleNum={tags[tagName].size} />
              ))}
            </div>
            <div className="tags-lists">
              {Object.keys(tags).map(tagName => (
                <div id={tagName.replace(' ', '')} className="tag-list" key={tagName}>
                  <TagLabel mode={'label'} tagName={tagName} />
                  {tags[tagName].map(({ year, month, day, title, url }) => (
                    <div className="article" key={`/${year}/${month}/${day}/${url}`}>
                      <Link to={`/${year}/${month}/${day}/${url}`}>
                        <h3 className="article-title">{title}</h3>
                      </Link>
                      <hr />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <Profile />
        </div>
      </section>
    );
  }
}

Tags.propTypes = {
  tags: PropTypes.shape().isRequired,
  fetchTags: PropTypes.func.isRequired
};

Tags.defaultProps = {
};

export default Tags;
