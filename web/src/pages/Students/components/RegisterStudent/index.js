import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import { registerRequest } from '~/store/modules/student/actions';

import { Container, Header, Content, ControlElement } from './styles';

export default function EditStudent() {
  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(registerRequest(data));
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Header>
          <strong>Register Student</strong>
          <aside>
            <Link to="/students">
              <button type="button">RETURN</button>
            </Link>
            <button type="submit">SAVE</button>
          </aside>
        </Header>
        <Content>
          <div className="editRow">
            <ControlElement>
              <Input name="name" placeholder="Your name" label="FULL NAME" />
            </ControlElement>
            <ControlElement>
              <Input
                name="email"
                type="email"
                placeholder="your@email.com"
                label="E-MAIL"
              />
            </ControlElement>
          </div>
          <div className="editColumn">
            <ControlElement>
              <Input name="age" type="number" placeholder="Age" label="AGE" />
            </ControlElement>
            <ControlElement>
              <Input
                name="weight"
                type="number"
                placeholder="Wight (Kg)"
                label="WEIGHT"
              />
            </ControlElement>
            <ControlElement>
              <Input
                name="height"
                type="text"
                placeholder="Height (m)"
                label="HEIGHT"
              />
            </ControlElement>
          </div>
        </Content>
      </Form>
    </Container>
  );
}
