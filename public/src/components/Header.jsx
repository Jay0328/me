import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';
import injectSheet from 'react-jss';
import { pure } from 'recompose';
import { connect } from 'react-redux';
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
    top: '0',
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

const HeaderContent = connect(state => ({
  date: state.getIn(['article', 'date']),
  title: state.getIn(['article', 'title']),
  tags: state.getIn(['article', 'tags']).toArray(),
}))(injectSheet(styles)(({ classes, mode, date, title, tags }) => {
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
      {mode === 'article' ? tags.map(tag => <div>{tag.tagName}</div>) : null}
      <h1>{headerTitle}</h1>
      {mode === 'article' ? <h4>{date}</h4> : null}
    </section>
  );
}));

const HeaderComponent = mode => {
  const Component = ({ classes, match }) => (
    <main className={classes.header}>
      <HeaderBackground mode={mode} match={match} />
      <HeaderContent mode={mode} />
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
    <Route exact strict path='/tags/' component={HeaderComponent('tags')} />
    <Route exact strict path='/tags/:tag/' component={HeaderComponent('tags')} />
    <Route exact strict path='/categories/' component={HeaderComponent('categories')} />
    <Route exact strict path='/:year/:month/:day/:url/' component={HeaderComponent('article')} />
  </header>
);

export default withRouter(pure(Header));
