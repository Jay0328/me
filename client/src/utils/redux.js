/*  type  */
export const createActionTypes = (types) => types.reduce((ret, key) => ({
  ...ret,
  [key]: key
}), {});

/*  actions */
const changeTypesToFncName = (types) => {
  let [first, ...others] = types.split('_');
  first = first.toLowerCase();
  others = others.map(t => `${t.substr(0, 1)}${t.substr(1).toLowerCase()}`).join('');
  return `${first}${others}`;
};

const paramMap = param => param;

export const createAction = (type, payloadCreator) => (...params) => {
  const payload = payloadCreator ? payloadCreator(...params) : paramMap(...params);
  return {
    type,
    ...(payload ? { payload } : null),
  };
};

export const createActions = (actions) => (
  Object
    .keys(actions)
    .reduce((newActions, types) => ({
      ...newActions,
      ...types
        .split(',')
        .reduce((ret, type) => ({
          ...ret,
          [changeTypesToFncName(type)]: createAction(type, actions[types])
        }), {})
    }), {})
);

/*  reducer */
const flattenHandler = (types, handler) => (
  types
    .split(',')
    .reduce((ret, t) => ({
      ...ret,
      [t]: handler
    }), {})
);

export const createReducer = (handlers, initialState) => {
  const flattenedHandlers = Object
    .entries(handlers)
    .reduce((ret, [types, h]) => ({
      ...ret,
      ...flattenHandler(types, h)
    }), {});
  return (state = initialState, action) => flattenedHandlers[action.type] ?
    flattenedHandlers[action.type](state, action) :
    state;
};
