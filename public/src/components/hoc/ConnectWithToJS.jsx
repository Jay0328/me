import React from 'react';
import { connect } from 'react-redux';
import { Iterable } from 'immutable';

const ToJS = WrappedComponent => wrappedComponentProps => {
  const propsJS = Object
    .entries(wrappedComponentProps)
    .reduce((newProps, wrappedComponentProp) => {
      const key = wrappedComponentProp[0];
      const value = wrappedComponentProp[1];
      newProps[key] = Iterable.isIterable(value) ? value.toJS() : value;
      return newProps;
    }, {});
  return <WrappedComponent {...propsJS} />;
};

const ConnectWithToJS = (
  mapStateToProps,
  mapDispatchToProps,
  WrappedComponent
) => connect(
  mapStateToProps,
  mapDispatchToProps
)(ToJS(WrappedComponent));

export default ConnectWithToJS;
