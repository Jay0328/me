import { grey, themeColor } from 'Theme/colors';

export default {
  pagination: {
    display: 'table',
    minHeight: '32px',
    border: '1px solid rgba(34, 36, 38, .15)',
    boxShadow: '0 1px 2px 0 rgba(34, 36, 38, .15)',
    borderRadius: '5px',
    margin: '50px auto 0 auto'
  },
  item: {
    display: 'table-cell',
    textAlign: 'center',
    textDecoration: 'none',
    userSelect: 'none',
    color: 'black',
    height: '100%',
    minWidth: '32px',
    lineHeight: '32px',
    '&.active, &:hover': {
      color: grey,
      backgroundColor: themeColor
    }
  },
  divider: {
    userSelect: 'none',
    textAlign: 'center',
    height: '100 %',
    minWidth: '32px',
    lineHeight: '32px',
    display: 'table - cell'
  }
};
