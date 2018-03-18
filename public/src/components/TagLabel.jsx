import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';

const styles = {
  tagLabel: {
    userSelect: 'none',
    fitContent: 'height',
    cursor: 'pointer',
    color: 'white',
    textDecoration: 'none',
    border: 'none',
    borderRadius: '4px',
    margin: '5px',
    padding: '0 10px',
    minWidth: '100px',
    textAlign: 'center',
    fontSize: '14px',
    lineHeight: '28px',
    backgroundColor: ({ articleNum = 0 }) => {
      if (!articleNum) return 'transparent';
      /* 1(187, 187, 238) to 10(41, 140, 180) */
      const r = articleNum < 10 ? Math.round(187 - (articleNum * 14.6)) : 41;
      const g = articleNum < 10 ? Math.round(187 - (articleNum * 4.7)) : 140;
      const b = articleNum < 10 ? Math.round(238 - (articleNum * 5.8)) : 180;
      return `rgba(${r}, ${g}, ${b}, 1)`;
    },
    '&:hover': {
      backgroundColor: ({ articleNum = 0 }) => articleNum ? 'rgba(41, 140, 180)' : 'rgba(255, 255, 255, .6)'
    }
  }
};

const TagLabel = ({ classes, tagName }) => (
  <Link
    className={classes.tagLabel}
    to={`/tags/${tagName.replace(' ', '')}/`}
  >
    {tagName}
  </Link>
);

TagLabel.propTypes = {
  classes: PropTypes.shape().isRequired,
  tagName: PropTypes.string.isRequired,
};

export default injectSheet(styles)(TagLabel);
