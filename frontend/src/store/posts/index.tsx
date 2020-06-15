import { Reducer } from 'redux';

import { PostsState, PostsTypes } from './types';

export const initialState: PostsState = {
  data: [],
  error: false,
  loading: false,
  post: { id: 0, priority: '', title: '', message: '', createdAt: 0 },
};

const reducer: Reducer<PostsState> = (state = initialState, action) => {
  switch (action.type) {
    case PostsTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case PostsTypes.LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload.data,
      };
    case PostsTypes.LOAD_FAILURE:
      return { ...state, loading: false, error: true, data: [] };
    case PostsTypes.LOAD_POST:
      return {
        ...state,
        loading: false,
        error: false,
        post: action.payload.data,
      };
    case PostsTypes.CLEAR_FIELDS:
      return { ...state, post: initialState.post };
    default:
      return state;
  }
};

export { reducer as postsReducer };
