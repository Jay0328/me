import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';
import injectSheet from 'react-jss';
import ConnectWithToJS from './hoc/ConnectWithToJS';
import TagLabel from './TagLabel';
import { lightGrey } from './theme/colors';
import { headerHeight } from './theme/size';
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
    height: `${headerHeight}px`,
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

@injectSheet(styles)
class HeaderBackground extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    match: PropTypes.shape().isRequired,
    mode: PropTypes.string.isRequired
  }

  render() {
    const { classes, match, mode } = this.props;
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
  }
}

@ConnectWithToJS(
  state => ({
    isFetching: state.getIn(['UI', 'isFetching']),
    date: state.getIn(['article', 'date']),
    title: state.getIn(['article', 'title']),
    tags: state.getIn(['article', 'tags'])
  }),
  null
)
@injectSheet(styles)
class HeaderContent extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    mode: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape()).isRequired
  }

  render() {
    const { classes, mode, isFetching, date, title, tags } = this.props;
    let headerTitle;
    if (mode === 'home') {
      headerTitle = 'Jay Blog';
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
          {mode === 'article' && !isFetching ? tags.map(({ tagName }) => (
            <TagLabel
              key={tagName}
              tagName={tagName}
              backgroundColor="transparent"
              hoverBackgroundColor="rgba(255, 255, 255, .4)"
              borderColor="white"
            />
          )) : null}
        </section>
        {mode !== 'article' || !isFetching ? <h1 className={classes.title}>{headerTitle}</h1> : null}
        {mode === 'article' && !isFetching ? <span className={classes.date}>{date}</span> : null}
      </section>
    );
  }
}

const HeaderComponent = mode => {
  @injectSheet(styles)
  class Component extends PureComponent {
    static propTypes = {
      classes: PropTypes.shape().isRequired,
      match: PropTypes.shape().isRequired
    }

    render() {
      const { classes, match } = this.props;
      return (
        <main className={classes.header}>
          <HeaderBackground mode={mode} match={match} />
          <HeaderContent mode={mode} />
        </main>
      );
    }
  }
  return Component;
};

@withRouter
class Header extends PureComponent {
  render() {
    return (
      <header>
        <Route exact strict path='/' component={HeaderComponent('home')} />
        <Route exact strict path='/page/:page/' component={HeaderComponent('home')} />
        <Route strict path='/tags/' component={HeaderComponent('tags')} />
        <Route strict path='/categories/' component={HeaderComponent('categories')} />
        <Route exact strict path='/:year/:month/:day/:url/' component={HeaderComponent('article')} />
      </header>
    );
  }
}

export default Header;
