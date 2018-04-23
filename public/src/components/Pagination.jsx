import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import { themeColor, grey } from './theme/colors';

const styles = {
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
    '&.activated, &:hover': {
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

@injectSheet(styles)
class Pagination extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    baseUrl: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    totalPage: PropTypes.number.isRequired
  }

  render() {
    const { classes, baseUrl, page, totalPage } = this.props;
    let menu = [];
    let menuStart = page - 2;
    let menuEnd;
    while (menuStart < 1) menuStart += 1;
    menuEnd = menuStart + 4;
    while (menuEnd > totalPage) {
      menuEnd -= 1;
      if (menuStart > 1) menuStart -= 1;
    }
    /* prev */
    if (page > 1) {
      menu = [
        ...menu,
        <Link
          className={classes.item}
          to={page > 2 ? `${baseUrl !== '/' ? baseUrl : ''}/page/${page - 1}/` : baseUrl}
          key={`link-page-${page - 1}`}
        >
          &#x21E6;
        </Link>
      ];
    }
    if (menuStart > 1) {
      menu = [
        ...menu,
        <Link className={classes.item} to={baseUrl} key='link-last-page'>1</Link>,
        <div className={classes.divider} key='page-divider-left'>...</div>
      ];
    }
    /* page menu */
    menu = [
      ...menu,
      Array
        .from({ length: (menuEnd - menuStart) + 1 }, (v, k) => k + menuStart)
        .map(p => p === page ?
          <div className={`${classes.item} activated`} key={`link-page-${p}`}>{p}</div>
          :
          (
            <Link
              className={classes.item}
              to={p !== 1 ? `${baseUrl !== '/' ? baseUrl : ''}/page/${p}/` : baseUrl}
              key={`link-page-${p}`}
            >
              {p}
            </Link>
          ))
    ];
    /* next */
    if (menuEnd < totalPage) {
      menu = [
        ...menu,
        <div className={classes.divider} key='page-divider-right'>...</div>,
        <Link
          className={classes.item}
          to={`${baseUrl !== '/' ? baseUrl : ''}/page/${totalPage}/`}
          key={`link-page-${totalPage}`}
        >
          {totalPage}
        </Link>
      ];
    }
    if (page < totalPage) {
      menu = [
        ...menu,
        <Link
          className={classes.item}
          to={`${baseUrl !== '/' ? baseUrl : ''}/page/${page + 1}/`}
          key='link-next-page'
        >
          &#x21E8;
        </Link>
      ];
    }
    return <div className={classes.pagination}>{menu}</div>;
  }
}

export default Pagination;
