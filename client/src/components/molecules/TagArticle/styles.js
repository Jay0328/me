import { themeColor, grey } from 'Theme/colors';

export default {
  listName: {
    fontSize: '20px',
    color: themeColor,
  },
  article: {
    marginLeft: '25px',
    '& hr': {
      margin: '20px 0',
      border: '0',
      borderTop: '1px solid #eee'
    }
  },
  link: {
    textDecoration: 'none',
    color: grey,
    '&:hover': {
      color: themeColor
    }
  }
};
