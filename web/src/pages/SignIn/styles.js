import styled from 'styled-components';

export const Container = styled.div`
  width: 360px;
  height: 448px;
  background: #fff;
  padding: 60px 30px;
  border-radius: 4px;

  img {
    max-width: 100px;
    height: auto;
  }

  p {
    color: #ee4d64;
    font-size: 30px;
    font-weight: bold;
    margin-top: 5px;
  }

  label {
    align-self: flex-start;
    font-weight: bold;
    margin: 10px 0 8px;
  }
`;
