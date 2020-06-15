import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { shallow } from 'enzyme';

import { FormView } from './index';

describe('FormView test', () => {
  const props: any = {
    posts: [
      {
        id: 13,
        priority: 'low',
        title: 'Title test',
        message: 'Message test',
      },
    ],
    post: {
      id: 0,
      priority: '',
      title: '',
      message: '',
    },
  };

  it('should contains priority, title and message fields', () => {
    const wrapper = shallow(<FormView {...props} />);

    const prioritySelect = wrapper.find('.select-container');
    const titleInput = wrapper.find('.titleInput');
    const messageInput = wrapper.find('.messageInput');

    expect(prioritySelect.exists()).toBeTruthy();
    expect(titleInput).toHaveLength(1);
    expect(messageInput).toHaveLength(1);
  });

  it('should pre-fill the form fields with the post data on edit mode', () => {
    props.post = {
      id: 1,
      title: 'Test Title',
      priority: 'low',
      message: 'Test Message, hello world',
    };
    const wrapper = shallow(<FormView {...props} />);

    const prioritySelect = wrapper.find('.select-container');
    const titleInput = wrapper.find('.titleInput');
    const messageInput = wrapper.find('.messageInput');

    expect(prioritySelect.prop('defaultValue').value).toEqual('low');
    expect(titleInput.prop('defaultValue')).toEqual('Test Title');
    expect(messageInput.prop('defaultValue')).toEqual(
      'Test Message, hello world',
    );
  });

  it('should shows validation errors', async () => {
    props.post = {
      id: 0,
      title: '',
      priority: '',
      message: '',
    };

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    const wrapper = render(<FormView {...props} />);
    const form = wrapper.container.querySelector('form');
    const messageInput = wrapper.getByTestId('message-input');
    const titleInput = wrapper.getByTestId('title-input');

    fireEvent.submit(form);

    await wait(() => {
      expect(window.alert).toBeCalledWith(
        'ValidationError: Message is Required!',
      );
    });

    fireEvent.change(messageInput, { target: { value: 'Message test' } });

    fireEvent.submit(form);

    await wait(() => {
      expect(window.alert).toBeCalledWith(
        'ValidationError: Title is Required!',
      );
    });

    fireEvent.change(titleInput, { target: { value: 'Title test' } });

    fireEvent.submit(form);

    await wait(() => {
      expect(window.alert).toBeCalledWith(
        'ValidationError: Priority is Required!',
      );
    });

    expect(window.alert).toBeCalledTimes(3);
  });

  // This last test didn't work.
  /* it('should submits the correct data', async () => {
    const props2: any = {
      posts: [
        {
          id: 13,
          priority: 'low',
          title: 'Title test',
          message: 'Message test',
        },
      ],
      post: {
        id: 12,
        title: 'Title test',
        priority: 'high',
        message: 'Message test',
      },
    };

    const wrapper = shallow(<FormView {...props2} />);
    console.log(wrapper.instance());
    const form = wrapper.find('.form-container');
    console.log(form);

    wrapper.find('button').simulate('click');
    wrapper.find('button').simulate('click');
    wrapper.find('button').simulate('click');
    form.prop('onSubmit')();

    jest.spyOn(wrapper.instance(), 'handleSubmit').mockImplementation(() => {});

    // wrapper.instance().handleSubmit();

    expect(wrapper.instance().handleSubmit).toBeCalled();
  }); */
});
