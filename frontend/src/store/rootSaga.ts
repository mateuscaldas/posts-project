import { all, takeLatest } from 'redux-saga/effects';

import { PostsTypes } from './posts/types';
import { loadPosts } from './posts/sagas';

export default function* rootSaga() {
  return yield all([takeLatest(PostsTypes.LOAD_REQUEST, loadPosts)]);
}
