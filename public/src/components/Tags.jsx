import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './Header';
import Profile from './Profile';
import TagLabel from './TagLabel';

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchTags();
  }

  componentDidMount() {
    if (!this.props.fromTags) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
    document.title = 'Tags | Taku\'s blog';
  }

  render() {
    const tagFilter = this.props.match.params.tag;
    const { tags } = this.props;

    const tagsCloud = (
      <div className="tags-labels">
        {Object.keys(tags).map(tagName => (
          <TagLabel
            key={tagName}
            mode={'cloud'}
            tagName={tagName}
            articleNum={tags[tagName].size}
            fromTags={true}
          />
        ))}
      </div>
    );

    const tagsLists = (
      <div className="tags-lists">
        {Object.keys(tags).filter(tagName => !tagFilter || tagFilter === tagName.replace(' ', ''))
          .map(tagName => (
            <div id={tagName.replace(' ', '')} className="tag-list" key={tagName}>
              <TagLabel mode={'label'} tagName={tagName} />
              {tags[tagName].map(({ year, month, day, title, url }) => (
                <div className="tag-article" key={`/${year}/${month}/${day}/${url}`}>
                  <Link to={`/${year}/${month}/${day}/${url}/`}>
                    <h3 className="tag-article-title">{title}</h3>
                  </Link>
                  <hr />
                </div>
              ))}
            </div>
          ))}
      </div>
    );

    return (
      <section className="tags">
        <Header mode="tags" />
        <div className="container">
          <div className="tags-container">
            {tagsCloud}
            {tagsLists}
          </div>
          <Profile />
        </div>
      </section>
    );
  }
}

Tags.propTypes = {
  match: PropTypes.shape().isRequired,
  tags: PropTypes.shape().isRequired,
  fetchTags: PropTypes.func.isRequired,
  fromTags: PropTypes.bool.isRequired
};

export default Tags;
