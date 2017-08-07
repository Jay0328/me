import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Pagination = ({ baseUrl, page, totalPage }) => {
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
        to={page > 2 ? `${baseUrl !== '/' ? baseUrl : ''}/page/${page - 1}` : baseUrl}
        key={`link-page-${page - 1}`}
      >
        &#x21E6;
      </Link>
    ];
  }
  if (menuStart > 1) {
    menu = [
      ...menu,
      <Link to={baseUrl} key='link-page-1'>1</Link>,
      <div key='page-divider-left'>...</div>
    ];
  }
  /* page menu */
  menu = [
    ...menu,
    Array.from({ length: (menuEnd - menuStart) + 1 }, (v, k) => k + menuStart)
      .map(p => {
        if (p === page) return <div key={`link-page-${p}`}>{p}</div>;
        return (
          <Link
            to={p !== 1 ? `${baseUrl !== '/' ? baseUrl : ''}/page/${p}` : baseUrl}
            key={`link-page-${p}`}
          >
            {p}
          </Link>
        );
      })
  ];
  /* next */
  if (menuEnd < totalPage) {
    menu = [
      ...menu,
      <div key='page-divider-right'>...</div>,
      <Link
        to={`${baseUrl !== '/' ? baseUrl : ''}/page/${totalPage}`}
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
        to={`${baseUrl !== '/' ? baseUrl : ''}/page/${page + 1}`}
        key={`link-page-${page + 1}`}
      >
        &#x21E8;
       </Link>
    ];
  }
  return <div className="pagination">{menu}</div>;
};

Pagination.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired
};

Pagination.defaultProps = {
};

export default Pagination;
