import { themeColor } from 'Theme/colors';

export default {
  link: {
    display: 'block',
    textDecoration: 'none',
    width: 'fit-content',
    margin: '10px 0',
    paddingLeft: '5px',
    color: 'black',
    '&:hover': {
      color: themeColor
    }
  },
  title: {
    extend: 'link',
    fontSize: '26px',
    fontWeight: '800'
  },
  meta: {
    extend: 'link',
    '& > i': {
      marginRight: '5px'
    }
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap'
  }
};
