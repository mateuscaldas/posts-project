/* Action types */
export enum PostsTypes {
  LOAD_REQUEST = '@posts/LOAD_REQUEST',
  LOAD_SUCCESS = '@posts/LOAD_SUCCESS',
  LOAD_FAILURE = '@posts/LOAD_FAILURE',
  LOAD_POST = '@posts/LOAD_POST',
  CLEAR_FIELDS = '@posts/CLEAR_FIELDS',
}

/* Data types */
export interface Post {
  id: number;
  priority: 'low' | 'medium' | 'high' | '';
  title: string;
  message: string;
  createdAt: number;
}

/* State types */
export interface PostsState {
  readonly data: Post[];
  readonly post: Post;
  readonly loading: boolean;
  readonly error: boolean;
}
