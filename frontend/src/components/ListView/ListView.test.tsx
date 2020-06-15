import React from 'react';
import createSagaMiddleware from 'redux-saga';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { render } from '@testing-library/react';

import api from '../../services/api';
import { initialState } from '../../store/posts';
import rootSaga from '../../store/rootSaga';
import { Post } from '../../store/posts/types';
import { ListView } from './index';

describe('ListView test', () => {
  it('should renders a row for each post in the list from the API response', () => {
    const apiMock = new MockAdapter(api);
    const sagaMiddleware = createSagaMiddleware();
    const mockStore = configureMockStore([sagaMiddleware]);
    const store = mockStore(initialState);
    sagaMiddleware.run(rootSaga);

    const response: Post[] = [
      {
        id: 13,
        priority: 'low',
        title: 'Title test',
        message: 'Message test',
        createdAt: 1591559279620,
      },
      {
        id: 14,
        priority: 'high',
        title: 'Title test 2',
        message: 'Message test 2',
        createdAt: 1591559279620,
      },
    ];

    apiMock.onGet('posts', response);

    const loadRequest = jest.fn();
    const props: any = {
      posts: response,
      loadRequest,
    };

    // const tree = renderer.create(<ListView {...props} />);
    const { getByText } = render(<ListView {...props} />);

    expect(getByText('Title test')).toBeTruthy();
    expect(getByText('Title test 2')).toBeTruthy();
  });
});
