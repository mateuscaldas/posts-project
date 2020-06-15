import React, { Component } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { FaCircle, FaTrash, FaEdit } from 'react-icons/fa';

import { ApplicationState } from '../../store';
import { Post } from '../../store/posts/types';
import * as PostsActions from '../../store/posts/actions';

import { Container, PostContainer, Header, StyledPost } from './styles';
import api from '../../services/api';
import formatDate from '../../utils/formatDate';

interface StateProps {
  posts: Post[];
  post: Post;
}

interface DispatchProps {
  loadRequest(): void;
  loadPost(data: Post): void;
  clearFields(): void;
}

type Props = StateProps & DispatchProps;

export class ListView extends Component<Props> {
  componentDidMount() {
    const { loadRequest } = this.props;

    loadRequest();
  }

  render() {
    const { posts, loadRequest, loadPost, clearFields } = this.props;

    const handleDeletePost = async (id: number) => {
      posts.filter((post) => post.id !== id);
      await api.delete(`/posts/${id}`);
      clearFields();
      loadRequest();
    };

    const handleEditPost = async (id: number) => {
      const loadedePost = posts.filter((post) => post.id === id)[0];
      loadPost(loadedePost);
    };

    const handleAddPost = () => {
      clearFields();
    };

    return (
      <Container>
        <Header>
          <h1>Posts</h1>
          <button type="button" onClick={handleAddPost}>
            +
          </button>
        </Header>
        <PostContainer className="posts-list">
          {posts.map((post) => (
            <StyledPost
              key={post.id}
              priorityType={post.priority}
              className="post"
            >
              <div className="post-header">
                <FaCircle size={30} />
                <h1 key={post.id}>{post.title}</h1>
                <span>{formatDate(post.createdAt)}</span>
                <button type="button" onClick={() => handleEditPost(post.id)}>
                  <FaEdit className="delete-post" size={16} />
                </button>
                <button type="button" onClick={() => handleDeletePost(post.id)}>
                  <FaTrash className="delete-post" size={16} />
                </button>
              </div>
              <p>{post.message}</p>
            </StyledPost>
          ))}
        </PostContainer>
      </Container>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  posts: state.posts.data,
  post: state.posts.post,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ ...PostsActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListView);
