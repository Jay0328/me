import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import { routes, redirectRoutes } from 'Routes/config';
import RedirectRoute from 'Components/molecules/RedirectRoute';

const mapStateToProps = state => ({
  isAuthenticated: state.getIn(['auth', 'isAuthenticated'])
});

@withRouter
@connect(mapStateToProps)
class Routes extends PureComponent {
  static propTypes = {
    isAuthenticated: PropTypes.bool
  }

  static defaultProps = {
    isAuthenticated: null
  }

  render() {
    const { isAuthenticated } = this.props;
    return (
      <Switch>
        {routes.map(route => (
          <Route
            key={route.component.displayName}
            exact
            strict
            {...route}
          />
        ))}
        {
          redirectRoutes.map(({ redirect, ...route }) => (
            <RedirectRoute
              key={route.component.displayName}
              exact
              strict
              redirect={redirect(isAuthenticated)}
              {...route}
            />
          ))
        }
      </Switch>
    );
  }
}

export default Routes;
