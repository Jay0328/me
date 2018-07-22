export default {
  tagLabel: {
    userSelect: 'none',
    height: 'fit-content',
    cursor: 'pointer',
    color: ({ color = 'white' }) => color,
    textDecoration: 'none',
    border: ({ borderColor }) => borderColor ? `1px solid ${borderColor}` : 'none',
    borderRadius: '10px',
    margin: '5px',
    padding: '0 10px',
    textAlign: 'center',
    fontSize: '14px',
    lineHeight: '28px',
    whiteSpace: 'nowrap',
    backgroundColor: ({ backgroundColor, articleNum = 0 }) => {
      if (backgroundColor) return backgroundColor;
      /* 1(187, 187, 238) to 10(41, 110, 180) */
      const r = articleNum < 10 ? Math.round(187 - (articleNum * 14.6)) : 41;
      const g = articleNum < 10 ? Math.round(187 - (articleNum * 7.7)) : 110;
      const b = articleNum < 10 ? Math.round(238 - (articleNum * 5.8)) : 180;
      return `rgba(${r}, ${g}, ${b}, 1)`;
    },
    '&:hover': {
      color: ({ hoverColor, color = 'white' }) => hoverColor || color,
      backgroundColor: ({ hoverBackgroundColor = 'none' }) => hoverBackgroundColor,
      borderColor: ({ hoverBorderColor, borderColor }) => hoverBorderColor || borderColor
    }
  }
};
