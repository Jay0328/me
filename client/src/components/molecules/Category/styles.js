import { themeColor, lightGrey } from 'Theme/colors';
import { sm } from 'Theme/media';

export default {
  link: {
    textDecoration: 'none',
    width: '22%',
    [`@media (max-width: ${sm - 1}px)`]: {
      width: '45%'
    }
  },
  category: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '0px',
    '&:hover': {
      '& $categoryCover': {
        color: themeColor
      }
    }
  },
  categoryCover: {
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    backgroundColor: lightGrey,
    width: '100%',
    height: '150px'
  },
  categoryName: {
    position: 'absolute',
    fontSize: '24px',
    color: 'white',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  count: {
    margin: '10px',
    color: 'black'
  }
};
