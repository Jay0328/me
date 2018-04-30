import React from 'react';
import { connect } from 'react-redux';
import { Iterable } from 'immutable';
import getDisplayName from '../../utils/getDisplayName';

const toJS = WrappedComponent => {
  const ToJS = wrappedComponentProps => {
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
  ToJS.displayName = `ToJS(${getDisplayName(WrappedComponent)})`;
  return ToJS;
};

const ConnectWithToJS = (
  mapStateToProps,
  mapDispatchToProps
) => WrappedComponent => connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(WrappedComponent));

export default ConnectWithToJS;
