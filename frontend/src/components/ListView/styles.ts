import styled, { css } from 'styled-components';

interface PostProps {
  priorityType: 'low' | 'medium' | 'high' | '';
}

export const Container = styled.div`
  flex-direction: column;

  min-width: 350px;
  width: 30%;
  height: 100vh;
  padding: 16px;
  overflow: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    -webkit-border-radius: 10px;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: #a6a6a6;
  }

  ::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(255, 0, 0, 0.4);
  }
`;

export const Header = styled.div`
  padding: 8px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-weight: 500;
  }

  button {
    padding: 10px;
    width: 50px;
    height: 50px;
    background: #1a8cff;
    border-radius: 8px;
    color: #fff;
    border: 0;
    font-size: 30px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: #80bfff;
    }
  }
`;

export const PostContainer = styled.div`
  flex-direction: column;

  margin-top: 20px;
`;

export const StyledPost = styled.div<PostProps>`
  border: 2px solid #cccccc;

  flex-direction: column;
  margin-bottom: 12px;

  .post-header {
    align-items: center;
    height: 50px;
    font-size: 15 px;
    color: #737373;

    h1 {
      font-size: 18px;
      font-weight: bold;
    }

    span {
      margin-left: auto;
      margin-right: 12px;
    }

    button {
      background: transparent;
      border: 0;
      cursor: pointer;
    }

    svg.delete-post {
      color: #000;
    }
  }

  svg {
    color: #cc2900;
    margin: 0 10px;
    ${(props) =>
      props.priorityType === 'low' &&
      css`
        color: #4d9900;
      `}
    ${(props) =>
      props.priorityType === 'medium' &&
      css`
        color: #ff9900;
      `}
  }

  p {
    border-top: 2px solid #a6a6a6;
    padding: 16px;
  }
`;
