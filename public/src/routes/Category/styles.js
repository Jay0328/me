import { themeColor } from 'Theme/colors';

export default {
  categoryName: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > a': {
      '& > i': {
        color: 'black',
        marginRight: '10px',
        cursor: 'pointer',
        '&:hover': {
          color: themeColor
        }
      }
    },
    '& > h1': {
      margin: '0'
    }
  },
  articles: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  article: {
    width: 'fit-content'
  }
};
