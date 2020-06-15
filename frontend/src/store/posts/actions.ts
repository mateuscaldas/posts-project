import { action } from 'typesafe-actions';

import { PostsTypes, Post } from './types';

export const loadRequest = () => action(PostsTypes.LOAD_REQUEST);

export const loadSuccess = (data: Post[]) =>
  action(PostsTypes.LOAD_SUCCESS, { data });

export const loadFailure = () => action(PostsTypes.LOAD_FAILURE);

export const loadPost = (data: Post) => action(PostsTypes.LOAD_POST, { data });

export const clearFields = () => action(PostsTypes.CLEAR_FIELDS);
