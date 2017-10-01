import { fromJS, Map } from 'immutable';
import { RECEIVE_ARCHIVES } from '../actions/archivesActions';

const initialState = fromJS({
  archives: {},
  totalArticlesCount: 0
});

const handleArchives = archives =>
  archives.reduce((arch, article) => {
    /* immutable */
    let newArch = { ...arch };
    if (arch[article.year] && arch[article.year][article.month]) {
      newArch[article.year][article.month] = [...arch[article.year][article.month], article];
    }
    else if (arch[article.year]) {
      newArch[article.year][article.month] = [article];
    }
    else {
      newArch[article.year] = { [article.month]: [article] };
    }
    return newArch;
  }, {});

const Archives = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ARCHIVES:
      const { archives, totalArticlesCount } = action;
      return state.set('archives', Map(handleArchives(archives)))
        .set('totalArticlesCount', parseInt(totalArticlesCount, 10));
    default:
      return state;
  }
};

export default Archives;
