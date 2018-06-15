export default ({ colors: { themeColor, lighterGrey } }) => ({
  aboutMe: {
    color: lighterGrey,
    '& > hr': {
      margin: '20px 0',
      border: '0',
      borderTop: '1px solid #eee'
    },
    '& > p': {
      marginLeft: '15px'
    }
  },
  header: {
    marginLeft: '15px'
  },
  link: {
    color: lighterGrey,
    textDecoration: 'none',
    '&:hover': {
      color: themeColor
    }
  }
});
