import { lightGrey, themeColor } from 'Theme/colors';

export default {
  footer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '50px 0'
  },
  copyright: {
    fontSize: '14px',
    color: lightGrey,
    marginTop: '20px',
    lineHeight: 1.8,
    textAlign: 'center',
    '& a': {
      textDecoration: 'none',
      color: themeColor,
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  }
};
