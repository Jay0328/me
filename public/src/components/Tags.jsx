import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Profile from './Profile';

const Tag = ({ tagName }) => {
  return (
    <div>{tagName}</div>
  );
};

Tag.propTypes = {
  tagName: PropTypes.string.isRequired
};

class Tags extends React.Component {
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
          <div className="tags-block">
            {Object.keys(tags).map(tagName => (
              <Tag key={tagName} tagName={tagName} />
            ))}
          </div>
          <div className="tags-lists">
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
