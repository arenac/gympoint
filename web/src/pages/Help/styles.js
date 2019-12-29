import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  margin: 40px 0 10px 0;
  display: block;

  p {
    font-size: 20px;
    font-weight: bold;
  }
`;

export const Content = styled.div`
  padding: 20px 15px;
  background: #fff;
  border-radius: 4px;
`;

export const HelpTable = styled.table`
  width: 100%;
  padding: 12px 30px 5px 12px;

  thead th {
    text-align: left;
    padding: 12px 2px 5px 2px;
  }

  thead {
    th.studentColumn {
      width: 500px;
    }
  }

  tbody td {
    padding: 12px 2px 5px 2px;
    border-bottom: 1px solid #eee;
  }
`;

export const AnswerButton = styled.button`
  color: #4d85ee;
  background: none;
  border: none;

  &:hover {
    color: ${darken(0.08, '#4d85ee')};
  }
`;
