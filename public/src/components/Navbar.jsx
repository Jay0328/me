import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const linkUrl = [
    { url: '/', name: 'HOME' },
    { url: '/tags', name: 'TAGS' },
    { url: '/about', name: 'ABOUT' },
    { url: '/articles', name: 'ARTICLES' },
  ];
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <span className="navbar-brand-logo">Taku</span>
          <span className="navbar-brand-blog">{' \'s Blog'}</span>
        </Link>
      </div>
      <div className="navbar-link">
        {linkUrl.map(l => <Link to={l.url} key={l.name}>{l.name}</Link>)}
      </div>
    </nav>
  );
};

export default Navbar;
