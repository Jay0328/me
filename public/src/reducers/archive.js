import { fromJS, Map } from 'immutable';
import { RECEIVE_ARCHIVE } from '../actions/archiveActions';

const initialState = fromJS({
  archive: {},
  totalArticlesCount: 0
});

const handleArchive = archive =>
  archive.reduce((arch, article) => {
    /* immutable */
    let newArch = Object.assign({}, arch);
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

const Archive = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ARCHIVE:
      const { archive, totalArticlesCount } = action;
      return state.set('archive', Map(handleArchive(archive)))
        .set('totalArticlesCount', parseInt(totalArticlesCount, 10));
    default:
      return state;
  }
};

export default Archive;
