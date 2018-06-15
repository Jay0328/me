import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import links from './links';
import styles from './styles';

@injectSheet(styles)
class Navbar extends Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  }

  state = {
    isOpen: false,
    transparent: true
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = e => {
    e.preventDefault();
    const { transparent, isOpen } = this.state;
    const isScrolled = document.body.scrollTop > 80 || document.documentElement.scrollTop > 80;
    if (isScrolled && transparent) {
      this.setState({ transparent: false });
    }
    else if (!isScrolled && !transparent) {
      this.setState({ transparent: true });
    }
    if (isOpen) {
      this.setState({ isOpen: false });
    }
  }

  closeMenu = () => {
    this.setState({ isOpen: false });
  }

  toggleMenu = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  render() {
    const { isOpen, transparent } = this.state;
    const { classes } = this.props;
    return (
      <nav
        className={`${classes.navbar} ${transparent ? 'transparent' : ''}`}
        onBlur={this.closeMenu}
      >
        <div className={classes.brand}>
          <Link to="/">Jay Blog</Link>
        </div>
        <div className={`${classes.links} ${isOpen ? 'is-open' : ''}`}>
          {links.map(l => <Link to={l.url} key={l.name}>{l.name}</Link>)}
        </div>
        <button
          className={classes.toggleBtn}
          onClick={this.toggleMenu}
        >
          <i className="fa fa-bars"></i>
        </button>
      </nav>
    );
  }
}

export default Navbar;
