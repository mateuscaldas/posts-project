import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Select, { ValueType } from 'react-select';

import { Container } from './styles';
import Input from '../Input';
import { ApplicationState } from '../../store';
import { Post } from '../../store/posts/types';
import api from '../../services/api';

import * as PostsActions from '../../store/posts/actions';

type OptionType = { label: string; value: string };

interface StateProps {
  posts: Post[];
  post: Post;
}

interface DispatchProps {
  loadRequest(): void;
}

type Props = StateProps & DispatchProps;
type State = { priority: string };

export class FormView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { priority: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (formData: object) => {
    const { loadRequest, post, posts } = this.props;
    const { priority } = this.state;
    const lastPost = posts[posts.length - 1];

    try {
      const schema = Yup.object().shape({
        id: Yup.number(),
        priority: Yup.string().required('Priority is Required!'),
        title: Yup.string().required('Title is Required!'),
        message: Yup.string().required('Message is Required!'),
      });

      const id = lastPost.id + 1;

      const formPost = {
        id,
        priority,
        ...formData,
        createdAt: Date.now(),
      };
      await schema.validate(formPost);

      if (post.id === 0) {
        await api.post('/posts', formPost);
        loadRequest();
      } else {
        await api.put(`/posts/${post.id}`, {
          id: post.id,
          priority,
          ...formData,
        });
        loadRequest();
      }
    } catch (err) {
      alert(err.toString());
    }
  };

  render() {
    const { post } = this.props;
    const { priority } = this.state;

    const options = [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' },
    ];

    return (
      <Container>
        <Form
          id="form"
          key={post.id}
          className="form-container"
          onSubmit={this.handleSubmit}
        >
          <label>Priority</label>
          <Select
            name="priority"
            options={options}
            className="select-container"
            data-testid="priority-select"
            defaultValue={
              post.priority === ''
                ? { value: priority, label: 'choose one...' }
                : { value: post.priority, label: post.priority }
            }
            onChange={(e: ValueType<OptionType>) => {
              const { value } = e as OptionType;
              this.setState({ priority: value });
            }}
          />

          <label>Title</label>
          <Input
            className="titleInput"
            name="title"
            defaultValue={post.title}
            data-testid="title-input"
          />

          <label>Message</label>
          <Input
            className="messageInput"
            name="message"
            defaultValue={post.message}
            data-testid="message-input"
            type="textarea"
          />

          <button type="submit">{post.id !== 0 ? 'Edit' : 'Save'}</button>
        </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(FormView);
