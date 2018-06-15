import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

class RedirectRoute extends PureComponent {
  static propTypes = {
    component: PropTypes.func.isRequired,
    redirect: PropTypes.bool.isRequired,
    redirectUrl: PropTypes.string
  }

  static defaultProps = {
    redirectUrl: '/login/'
  }

  render() {
    const { component: Component, redirect, redirectUrl, ...rest } = this.props;
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
