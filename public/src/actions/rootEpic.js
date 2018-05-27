import { combineEpics } from 'redux-observable';
import { verifyAuthEpic, loginEpic } from './auth';

const rootEpic = combineEpics(
  verifyAuthEpic,
  loginEpic
);

export default rootEpic;
