import styled from 'styled-components';

export const Container = styled.div`
  min-width: 450px;
  width: 70%;
  height: 100vh;

  justify-content: center;

  form {
    display: flex;
    flex-direction: column;

    width: 65%;
    margin-top: 100px;
    font-size: 24px;

    label {
      margin: 10px;
    }

    div.select-container {
      padding: 10px;
      border-radius: 8px;
      margin-bottom: 8px;
      height: 60px;
      background: #fff;
      font-size: 20px;
      font-family: Arial, Helvetica, sans-serif;
      border: 1px solid #cccccc;
      color: #737373;

      div {
        flex: 1;
        justify-content: space-between;

        &.css-yk16xz-control {
          border-style: none;
        }

        span {
          background: #fff;
        }

        svg {
          margin-left: auto;
        }
      }
    }


    button {
      padding: 10px;
      width: 15%;
      height: 50px;
      margin-left: auto;
      margin-top: 20px;
      background: #1a8cff;
      border-radius: 8px;
      color: #fff;
      border: 0;
      font-size: 25px;
      transition: all 0.2s;

      &:hover {
        background: #80bfff;
      }
    }
    }


  }
`;
