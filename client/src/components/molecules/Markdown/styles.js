import { themeColor, opacityColor } from 'Theme/colors';

export default {
  markdown: {
    '& a': {
      color: themeColor,
      textDecoration: 'none',
      '&:hover': {
        color: opacityColor(themeColor, 0.8)
      }
    },
    '& blockquote': {
      borderLeft: `4px solid ${themeColor}`,
      margin: '20px 0',
      padding: '0 15px',
      color: '#777',
      '& > :first-child': {
        marginTop: '0'
      },
      '& > :last-child': {
        marginBottom: '0'
      }
    },
    '& code': {
      margin: '0 2px',
      padding: '0 5px',
      whiteSpace: 'nowrap',
      border: '1px solid #eaeaea',
      backgroundColor: '#f8f8f8',
      borderRadius: '3px',
    },
    '& pre': {
      fontSize: '13px',
      lineHeight: '19px',
      overflow: 'auto',
      padding: '6px 10px',
      borderRadius: '3px',
      '& code': {
        margin: '0',
        padding: '0',
        whiteSpace: 'pre',
        border: 'none',
        background: 'transparent'
      }
    },
    '& table': {
      borderCollapse: 'collapse',
      '& tr': {
        borderTop: '1px solid #cccccc',
        '&:nth-child(2n)': {
          backgroundColor: '#f8f8f8',
        },
        '& th': {
          fontWeight: 'bold'
        },
        '& th, & td': {
          border: '1px solid #cccccc',
          padding: '6px 13px'
        }
      }
    }
  }
};
