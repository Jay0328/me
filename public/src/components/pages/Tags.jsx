import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import RoutePage from '../hoc/RoutePage';
import ConnectWithToJS from '../hoc/ConnectWithToJS';
import TagLabel from '../TagLabel';
import { fetchTagsIfNeed } from '../../actions/tagsActions';
import { themeColor, grey } from '../theme/colors';
import { xs, sm, md, lg } from '../theme/rwd';

const styles = {
  containerWidth: {
    width: '60%',
    [`@media (max-width: ${xs - 1}px)`]: {
      width: '100%'
    },
    [`@media (min-width: ${xs}px) and (max-width: ${sm - 1}px)`]: {
      width: '90%'
    },
    [`@media (min-width: ${sm}px) and (max-width: ${md - 1}px)`]: {
      width: '80%'
    },
    [`@media (min-width: ${md}px) and (max-width: ${lg - 1}px)`]: {
      width: '70%'
    }
  },
  cloud: {
    extend: 'containerWidth',
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  lists: {
    extend: 'containerWidth',
    margin: '25px auto 0 auto'
  },
  listName: {
    fontSize: '20px',
    color: themeColor,
    '& i': {
      marginRight: '10px'
    }
  },
  article: {
    marginLeft: '25px',
    '& a': {
      textDecoration: 'none',
      color: grey,
      '&:hover': {
        color: themeColor
      }
    },
    '& hr': {
      margin: '20px 0',
      border: '0',
      borderTop: '1px solid #eee'
    }
  }
};

const Tags = ({ classes, match, tags }) => {
  const tagFilter = match.params.tag;
  const tagsCloud = (
    <section className={classes.cloud}>
      {tags.map(({ tagName, articles }) => (
        <TagLabel
          key={tagName}
          tagName={tagName}
          hoverBackgroundColor={themeColor}
          articleNum={articles.length}
        />
      ))}
    </section>
  );
  const tagsLists = (
    <section className={classes.lists}>
      {tags
        .filter(({ tagName }) => !tagFilter || tagFilter === tagName.replace(' ', ''))
        .map(({ tagName, articles }) => (
          <section key={tagName}>
            <span className={classes.listName}>
              <i className="fa fa-tag" aria-hidden="true"></i>
              {tagName}
            </span>
            {articles.map(({ year, month, day, title, url }) => (
              <main
                className={classes.article}
                key={`/${year}/${month}/${day}/${url}`}
              >
                <Link to={`/${year}/${month}/${day}/${url}/`}>
                  <h3>{title}</h3>
                </Link>
                <hr />
              </main>
            ))}
          </section>
        ))}
    </section>
  );
  return (
    <main>
      {tagsCloud}
      {tagsLists}
    </main>
  );
};

Tags.propTypes = {
  classes: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

const TagsPage = RoutePage(
  injectSheet(styles)(Tags),
  {
    title: ({ match }) => match.params.tag || 'Tags'
  }
);

const mapStateToProps = state => ({
  tags: state.get('tags')
});

const mapDispatchToProps = dispatch => ({
  fetchData() {
    dispatch(fetchTagsIfNeed());
  }
});

const TagsContainer = ConnectWithToJS(
  mapStateToProps,
  mapDispatchToProps,
  TagsPage
);

export default withRouter(TagsContainer);

