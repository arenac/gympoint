import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Logo = styled.Image`
  width: 210px;
  height: 130px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

export const InputContainer = styled.View`
  padding: 0 15px;
  height: 46px;
  border-color: #ddd;
  border-width: 1px;
  border-radius: 4px;

  flex-direction: row;
  align-items: center;
`;

export const FormInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  font-size: 15px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 15px;
`;
