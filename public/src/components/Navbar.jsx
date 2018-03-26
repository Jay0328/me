import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import { themeColor, grey } from './theme/colors';
import { navHeight } from './theme/navbar';
import { sm } from './theme/rwd';

const linkStyle = (color, hoverColor) => ({
  userSelect: 'none',
  textDecoration: 'none',
  position: 'relative',
  color,
  '&:before': {
    position: 'absolute',
    content: '""',
    width: '0px',
    height: '1px',
    transition: '.2s ease-out all',
    left: '0',
    right: '0',
    bottom: '-5px',
    margin: 'auto'
  },
  '&:hover': {
    color: hoverColor,
    '&:before': {
      width: '100%',
      backgroundColor: hoverColor
    }
  }
});

const styles = {
  navbar: {
    position: 'fixed',
    height: `${navHeight}px`,
    width: '100vw',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0 15px',
    fontWeight: '800',
    boxShadow: '0 0 10px rgba(14, 14, 14, .26)',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    zIndex: '100',
    transition: 'all .2s linear',
    '&.transparent': {
      boxShadow: 'none',
      backgroundColor: 'transparent'
    },
    [`@media (max-width: ${sm - 1}px)`]: {
      position: 'absolute'
    }
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 'auto',
    fontSize: '18px',
    '& a': {
      extend: linkStyle(themeColor, grey)
    }
  },
  links: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '40vw',
    paddingRight: '20px',
    fontSize: '12px',
    letterSpacing: '1px',
    textShadow: '0 0 1px rgba(0, 0, 0, .1)',
    '& a': {
      extend: linkStyle(grey, themeColor)
    },
    [`@media (max-width: ${sm - 1}px)`]: {
      position: 'absolute',
      flexDirection: 'column',
      alignItems: 'flex-start',
      top: `${navHeight}px`,
      padding: '10px',
      right: '5px',
      visibility: 'hidden',
      opacity: '0',
      border: '1px solid rgba(34, 36, 38, .15)',
      borderRadius: '10px',
      width: '170px',
      lineHeight: 2.5,
      backgroundColor: 'white',
      zIndex: '-1',
      transform: 'translateY(-2em)',
      transition: 'all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 0s linear 0.01s',
      '&.is-open': {
        visibility: 'visible',
        opacity: '1',
        zIndex: '101',
        transform: 'translateY(0%)',
        transitionDelay: '0s, 0s, 0.3s'
      }
    }
  },
  toggleBtn: {
    position: 'relative',
    margin: '12px 0',
    backgroundColor: 'transparent',
    border: '1px solid transparent',
    borderRadius: '50%',
    transition: 'background-color 500ms linear',
    '&:active': {
      backgroundColor: themeColor
    },
    '&:focus': {
      outline: 'none'
    },
    [`@media (min-width: ${sm}px)`]: {
      display: 'none'
    }
  }
};

class Navbar extends Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      linkUrl: [
        { url: '/', name: 'HOME' },
        { url: '/about/', name: 'ABOUT' },
        { url: '/categories/', name: 'CATEGORIES' },
        { url: '/tags/', name: 'TAGS' }
      ],
      isOpen: false,
      transparent: true
    };
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
    const { isOpen, linkUrl, transparent } = this.state;
    const { classes } = this.props;
    return (
      <nav
        className={`${classes.navbar} ${transparent ? 'transparent' : ''}`}
        onBlur={this.closeMenu}
      >
        <div className={classes.brand}>
          <Link to="/">YC Blog</Link>
        </div>
        <div className={`${classes.links} ${isOpen ? 'is-open' : ''}`}>
          {linkUrl.map(l => <Link to={l.url} key={l.name}>{l.name}</Link>)}
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

export default injectSheet(styles)(Navbar);
