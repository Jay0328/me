import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import injectSheet from 'react-jss';
import Navbar from 'Organisms/Navbar';
import Header from 'Organisms/Header';
import Routes from 'Routes';
import Footer from 'Organisms/Footer';
import styles from './styles';

@withRouter
@injectSheet(styles)
class App extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <Navbar />
        <Header />
        <Routes />
        <Footer />
      </main>
    );
  }
}

export default App;
