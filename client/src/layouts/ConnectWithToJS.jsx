import React from 'react';
import { connect } from 'react-redux';
import { Iterable } from 'immutable';
import getDisplayName from 'Utils/getDisplayName';

const toJS = Component => {
  const ToJS = props => {
    const propsJS = Object
      .entries(props)
      .reduce((newProps, [key, value]) => ({
        ...newProps,
        [key]: Iterable.isIterable(value) ? value.toJS() : value
      }), {});
    return <Component {...propsJS} />;
  };
  ToJS.displayName = `ToJS(${getDisplayName(Component)})`;
  return ToJS;
};

const ConnectWithToJS = (...params) => Component => connect(...params)(toJS(Component));

export default ConnectWithToJS;
