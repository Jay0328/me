import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      linkUrl: [
        { url: '/', name: 'HOME' },
        { url: '/tags/', name: 'TAGS' },
        { url: '/about/', name: 'ABOUT' },
        { url: '/archive/', name: 'ARCHIVE' },
      ],
      isOpen: false
    };
  }

  dropdownMenu = e => {
    e.preventDefault();
    const originState = this.state.isOpen;
    this.setState({ isOpen: !originState });
  }

  hideMenu = () => {
    this.setState({ isOpen: false });
  }

  render() {
    const { linkUrl, isOpen } = this.state;
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
        <div className="navbar-hamburger-menu">
          <button className={`hamburger ${isOpen ? 'open' : 'close'}`} onClick={this.dropdownMenu}>
            <span className="hamb-top"></span>
            <span className="hamb-middle"></span>
            <span className="hamb-bottom"></span>
          </button>
          <div className={`menu ${isOpen ? 'open' : ''}`}>
            {linkUrl.map(l => (
              <Link
                to={l.url}
                key={l.name}
                onClick={this.hideMenu}
              >
                {l.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
