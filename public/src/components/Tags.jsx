import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import RoutePage from './hoc/RoutePage';
import TagLabel from './TagLabel';
import { fetchTagsIfNeed } from '../actions/tagsActions';
import { themeColor } from './theme/colors';

const styles = {
  cloud: {
    width: '85%',
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
};

const Tags = ({ classes, match, tags }) => {
  const tagFilter = match.params.tag;
  const tagsCloud = (
    <div className={classes.cloud}>
      {Object.keys(tags).map(tagName => (
        <TagLabel
          key={tagName}
          tagName={tagName}
          hoverBackgroundColor={themeColor}
          articleNum={tags[tagName].size}
        />
      ))}
    </div>
  );
  const tagsLists = (
    <div className="tags-lists">
      {Object.keys(tags)
        .filter(tagName => !tagFilter || tagFilter === tagName.replace(' ', ''))
        .map(tagName => (
          <div id={tagName.replace(' ', '')} className="tag-list" key={tagName}>
            <section>
              <i className="fa fa-tag" aria-hidden="true"></i>
              {tagName}
            </section>
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
    <main className="tags-container">
      {tagsCloud}
      {tagsLists}
    </main>
  );
};

Tags.propTypes = {
  classes: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
  tags: PropTypes.shape().isRequired
};

const TagsPage = RoutePage(injectSheet(styles)(Tags));

const mapStateToProps = state => ({
  tags: state.get('tags').toObject()
});

const mapDispatchToProps = dispatch => ({
  fetchData() {
    dispatch(fetchTagsIfNeed());
  }
});

const TagsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TagsPage);

export default withRouter(TagsContainer);

