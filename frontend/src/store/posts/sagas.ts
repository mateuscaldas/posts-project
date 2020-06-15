import { call, put } from 'redux-saga/effects';

import api from '../../services/api';
import { loadSuccess, loadFailure } from './actions';

export function* loadPosts() {
  try {
    const response = yield call(api.get, '/posts');

    yield put(loadSuccess(response.data));
  } catch (err) {
    yield put(loadFailure());
  }
}
