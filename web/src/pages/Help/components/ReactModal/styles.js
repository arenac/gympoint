import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  span {
    color: #ee4d64;
    align-self: self-start;
    margin: 0 0 10px;
    font-weight: bold;
  }

  div {
    font-size: 14px;
    color: #444;
    font-weight: bold;
  }

  p {
    font-size: 16px;
    color: #666;
    text-align: justify;
    margin-top: 14px;
    margin-bottom: 14px;
  }

  textarea {
    margin-top: 20px !important;
    padding: 0 10px;
    padding-top: 5px;
    margin: 0 0 10px;
    height: 150px;
    width: 100%;

    border-radius: 4px;
    border: 0.8px solid #ddd;

    background: #fff;
    color: #454444;

    &::placeholder {
      color: #999;
    }
  }

  button#answerButton {
    margin: 5px 0 0;
    height: 44px;
    background: #de3b3b;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: backdround 0.2s;

    &:hover {
      background: ${darken(0.05, '#de3b3b')};
    }
  }
`;

export const ButtonContainer = styled.div`
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
  text-align: right;

  button#closeButton {
    background: none;
    border: none;
    width: 30px;
    height: 30px;

    img {
      color: #ddd;
      transition: backdround 0.2s;

      &:hover {
        color: ${darken(0.5, '#ddd')};
      }
    }
  }
`;
