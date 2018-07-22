import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

class RedirectRoute extends PureComponent {
  static propTypes = {
    component: PropTypes.func.isRequired,
    redirect: PropTypes.bool,
    redirectUrl: PropTypes.string
  }

  static defaultProps = {
    redirect: null,
    redirectUrl: '/login/'
  }

  render() {
    const { component: Component, redirect, redirectUrl, ...rest } = this.props;
    if (redirect === null) {
      return null;
    }
    return (
      <Route
        {...rest}
        render={props => redirect ?
          (
            <Redirect
              to={{
                pathname: redirectUrl,
                state: { from: props.location }
              }}
            />
          ) :
          (
            <Component {...props} />
          )
        }
      />
    );
  }
}

export default RedirectRoute;
