import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Route } from 'react-router-dom';
import injectSheet from 'react-jss';
import { pure } from 'recompose';
import Navbar from './Navbar';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Tags from './Tags';
import Categories from './Categories';
import Article from './Article';
import Login from './Login';

const styles = {
  '@global': {
    '*': {
      boxSizing: 'border-box'
    },
    body: {
      fontFamily: '-apple-system, "PingFang SC", sans-serif'
    }
  },
  main: {
    width: '100vw'
  }
};

const App = ({ classes }) => (
  <main className={classes.main}>
    <Navbar />
    <Header />
    <Route exact strict path='/' component={Home} />
    <Route exact strict path='/page/:page/' component={Home} />
    <Route exact strict path='/tags/' component={Tags} />
    <Route exact strict path='/tags/:tag/' component={Tags} />
    <Route exact strict path='/categories/' component={Categories} />
    <Route exact strict path='/:year/:month/:day/:url/' component={Article} />
    <Route exact strict path='/login/' component={Login} />
    <Footer />
  </main>
);

App.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default injectSheet(styles)(withRouter(pure(App)));
