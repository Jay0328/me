import React, { PureComponent } from 'react';
import { withRouter, Route } from 'react-router-dom';
import HeaderComponent from './components';

const Home = HeaderComponent('home');
const Tags = HeaderComponent('tags');
const Categories = HeaderComponent('categories');
const Article = HeaderComponent('article');

@withRouter
class Header extends PureComponent {
  render() {
    return (
      <header>
        <Route exact strict path='/' component={Home} />
        <Route exact strict path='/page/:page/' component={Home} />
        <Route strict path='/tags/' component={Tags} />
        <Route strict path='/categories/' component={Categories} />
        <Route exact strict path='/:year/:month/:day/:url/' component={Article} />
      </header>
    );
  }
}

export default Header;
