import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
//  import RedirectRoute from 'Components/molecules/RedirectRoute';

import About from './About';
//  import Article from './Article';
import Category from './Category';
import Categories from './Categories';
//  import Home from './Home';
//  import Login from './Login';
//  import PostArticle from './PostArticle';
import Tags from './Tags';

const mapStateToProps = state => ({
  isAuthenticated: state.getIn(['auth', 'isAuthenticated'])
});

@withRouter
@connect(mapStateToProps)
class Routes extends PureComponent {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }

  render() {
    const { isAuthenticated } = this.props;
    console.error(isAuthenticated);
    return (
      <Switch>
        {/* <Route exact strict path='/' component={Home} />
        <Route exact strict path='/page/:page/' component={Home} /> */}
        <Route exact strict path='/about/' component={About} />
        <Route exact strict path='/tags/:tag?/' component={Tags} />
        <Route exact strict path='/categories/' component={Categories} />
        <Route exact strict path='/categories/:category/' component={Category} />
        {/* <Route exact strict path='/:year/:month/:day/:url/' component={Article} />
        <RedirectRoute
          exact
          strict
          path='/login/'
          redirect={isAuthenticated}
          redirectUrl='/'
          component={Login}
        />
        <RedirectRoute
          exact
          strict
          path='/admin/post-article/'
          redirect={!isAuthenticated}
          component={PostArticle}
        />  */}
      </Switch>
    );
  }
}

export default Routes;
