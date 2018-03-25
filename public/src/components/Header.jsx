import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';
import injectSheet from 'react-jss';
import { pure } from 'recompose';
import ConnectWithToJS from './hoc/ConnectWithToJS';
import TagLabel from './TagLabel';
import { lightGrey } from './theme/colors';
import { sm } from './theme/rwd';

const styles = {
  header: {
    position: 'relative'
  },
  img: {
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    backgroundColor: lightGrey,
    width: 'inherit',
    height: '500px',
    maxWidth: '100%',
    margin: '0 auto',
    [`@media (max-width: ${sm - 1}px)`]: {
      height: '100vh'
    }
  },
  content: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100%',
    top: '0'
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  title: {
    fontSize: '55px',
    color: 'white'
  },
  date: {
    fontSize: '18px',
    color: 'white'
  }
};

const HeaderBackground = injectSheet(styles)(({ classes, match, mode }) => {
  const { year, month, day, url } = match.params;
  return (
    <section
      className={classes.img}
      style={{
        backgroundImage: `url(${mode === 'article' ? `/covers/${year}-${month}-${day}-${url}` : `/images/${mode}`}.jpg)`
      }}
    >
    </section>
  );
});

HeaderBackground.propTypes = {
  match: PropTypes.shape().isRequired,
  mode: PropTypes.string.isRequired
};

const HeaderContent = injectSheet(styles)(({ classes, mode, date, title, tags }) => {
  let headerTitle;
  if (mode === 'home') {
    headerTitle = 'YC Blog';
  }
  else if (mode === 'article') {
    headerTitle = title;
  }
  else {
    headerTitle = `${mode.substr(0, 1).toUpperCase()}${mode.substr(1)}`;
  }
  return (
    <section className={classes.content}>
      <section className={classes.tags}>
        {mode === 'article' ? tags.map(({ tagName }) => (
          <TagLabel
            key={tagName}
            tagName={tagName}
            backgroundColor="transparent"
            hoverBackgroundColor="rgba(255, 255, 255, .4)"
            borderColor="white"
          />
        )) : null}
      </section>
      <h1 className={classes.title}>{headerTitle}</h1>
      {mode === 'article' && <span className={classes.date}>{date}</span>}
    </section>
  );
});

const HeaderContentContainer = ConnectWithToJS(
  state => ({
    date: state.getIn(['article', 'date']),
    title: state.getIn(['article', 'title']),
    tags: state.getIn(['article', 'tags'])
  }),
  null,
  HeaderContent
);

const HeaderComponent = mode => {
  const Component = ({ classes, match }) => (
    <main className={classes.header}>
      <HeaderBackground mode={mode} match={match} />
      <HeaderContentContainer mode={mode} />
    </main>
  );
  Component.propTypes = {
    classes: PropTypes.shape().isRequired,
    match: PropTypes.shape().isRequired
  };
  return injectSheet(styles)(Component);
};

const Header = () => (
  <header>
    <Route exact strict path='/' component={HeaderComponent('home')} />
    <Route exact strict path='/page/:page/' component={HeaderComponent('home')} />
    <Route strict path='/tags/' component={HeaderComponent('tags')} />
    <Route strict path='/categories/' component={HeaderComponent('categories')} />
    <Route exact strict path='/:year/:month/:day/:url/' component={HeaderComponent('article')} />
  </header>
);

export default withRouter(pure(Header));
