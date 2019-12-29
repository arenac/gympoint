import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  flex 1;
  padding: 0 20px;
  background: #ddd;
  height: 100%;
  `;

export const QuestionInput = styled.TextInput`
  margin-top: 25px;
  background: #fff;
  border: 1px solid #aaa;
  border-radius: 4px;
  font-size: 16px;
`;

export const NewQuestionButton = styled(Button)`
  margin-top: 25px;
`;
