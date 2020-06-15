import styled from 'styled-components';

export const StyledInput = styled.input`
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 8px;
  height: 60px;
  border: 1px solid #cccccc;
  font-size: 20px;

  &::placeholder {
  }

  &.messageInput {
    height: 120px;

    font-size: 20px;
  }
`;
