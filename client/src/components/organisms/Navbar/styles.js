import { themeColor, grey } from 'Theme/colors';
import { navHeight } from 'Theme/size';
import { sm } from 'Theme/media';

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

export default styles;
