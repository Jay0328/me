import pageActions from './template/pageActions';

export const RECEIVE_TAGS = 'RECEIVE_TAGS';

export const fetchTagsIfNeed = pageActions(
  RECEIVE_TAGS,
  '/api/tags',
  ['tags'],
  state => !state.get('tags').size
);
