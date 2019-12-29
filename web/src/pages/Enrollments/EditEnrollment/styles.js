import styled from 'styled-components';
import { Input } from '@rocketseat/unform';

export const Container = styled.div`
  padding: 30px 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  strong {
    font-size: 20px;
  }

  /*  */
  aside {
    a {
      button {
        color: #fff;
        background: #999;
        padding: 4px 15px;
        margin-right: 5px;
        border-radius: 4px;
        font-weight: bold;

        &:hover {
          background: darken(0.08, '#999');
        }
      }
    }

    button {
      color: #fff;
      background: #de3b3b;
      padding: 4px 15px;
      margin-right: 5px;
      border-radius: 4px;
      font-weight: bold;

      &:hover {
        background: darken(0.08, '#de3b3b');
      }
    }
  }
`;

export const Content = styled.div`
  padding: 20px;
  background: #fff;

  div.selectStudent {
    margin-top: 8px;
  }

  div.editRow {
    flex-direction: column;
  }

  div.editColumn {
    display: flex;
    flex-direction: row;

    label {
      display: block;
    }

    div.selectElement {
      width: 180px;
      margin-top: 8px;

      input {
        height: 1px;
      }
    }

    label {
      margin: 15px 0 5px 0;
      font-weight: bold;
    }

    input {
      margin-top: 8px !important;
      padding: 0 15px;
      margin: 0 0 10px;
      height: 37px;
      width: 100%;

      border-radius: 4px;
      border: 1px solid #ddd;

      background: #fff;

      &::placeholder {
        color: #999;
      }
    }

    input:read-only {
      background-color: #f5f5f5;
    }
  }
`;

export const Label = styled.label`
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;

  margin-bottom: 10px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputText = styled(Input)`
  background: ${props => (props.disabled ? '#eee' : '#fff')};
`;

export const ControlElement = styled.div`
  text-align: left;
  margin: 10px;
`;
