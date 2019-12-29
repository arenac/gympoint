import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { lighten } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    div {
      display: flex;
      margin-right: 7px;
      padding-right: 20px;
      border-right: 1px solid #eee;
      align-items: center;

      img {
        max-width: 70px;
        height: auto;
        margin-right: 5px;
      }

      span {
        color: #ee4d64;
        font-weight: bold;
      }
    }

    a {
    }
  }

  aside {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    button {
      background: none;
      border: none;
      color: #ee4d64;
      font-weight: bold;

      &:hover {
        color: ${lighten(0.1, '#ee4d64')};
      }
    }
  }
`;

export const MenuItem = styled(Link)`
  margin-left: 13px;
  font-weight: bold;
  color: ${props => (props.selected ? '#000' : '#999')};
  text-transform: uppercase;
`;
