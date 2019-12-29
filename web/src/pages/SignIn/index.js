import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';

import { signInRequest } from '~/store/modules/auth/actions';

import { Container } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insert a valid e-mail')
    .required('A valid e-mail is required'),
  password: Yup.string()
    .min(6, 'The passwor should have at least 6 characters')
    .required('Password is required'),
});

export default function SigIn() {
  const dispatch = useDispatch();
  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }
  return (
    <Container>
      <img src={logo} alt="GoBarber" />
      <p>GYMPOINT</p>

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input
          name="email"
          label="YOUR EMAIL"
          type="email"
          placeholder="example@email.com"
        />
        <Input
          name="password"
          label="YOUR PASSWORD"
          type="password"
          placeholder="*************"
        />

        <button type="submit">Log In</button>
      </Form>
    </Container>
  );
}
