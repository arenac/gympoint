import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import logo from '~/assets/logo.png';

import api from '~/services/api';
import { validateRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Logo,
  Form,
  InputContainer,
  FormInput,
  SubmitButton,
} from './styles';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const [id, setId] = useState('');

  function handleSubmit() {
    dispatch(validateRequest(id));
    setId('');
  }

  return (
    <Container>
      <Logo source={logo} />
      <Form>
        <InputContainer>
          <FormInput
            autoCorrect={false}
            autoCaptalize="none"
            placeholder="Your ID"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={id}
            onChangeText={setId}
          />
        </InputContainer>

        <SubmitButton loading={loading} onPress={handleSubmit}>
          Enter
        </SubmitButton>
      </Form>
    </Container>
  );
}
