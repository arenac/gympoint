import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import { registerRequest } from '~/store/modules/plan/actions';
import { formatPrice } from '~/utils/format';

import { Container, Header, Content, ControlElement } from './styles';

export default function RegisterPlan() {
  const dispatch = useDispatch();
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');

  const total = useMemo(() => {
    return formatPrice(duration * price);
  }, [duration, price]);

  function handleSubmit(data) {
    dispatch(registerRequest(data));
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Header>
          <strong>Register Plan</strong>
          <aside>
            <Link to="/plans">
              <button type="button">RETURN</button>
            </Link>
            <button type="submit">SAVE</button>
          </aside>
        </Header>
        <Content>
          <div className="editRow">
            <ControlElement>
              <Input name="title" placeholder="Plan title" label="PLAN TITLE" />
            </ControlElement>
          </div>
          <div className="editColumn">
            <ControlElement>
              <Input
                name="duration"
                type="number"
                placeholder="Duration (month)"
                onChange={event => setDuration(event.target.value)}
                label="DURATION"
              />
            </ControlElement>
            <ControlElement>
              <Input
                name="price"
                type="number"
                placeholder="$ / month"
                onChange={event => setPrice(event.target.value)}
                label="MONTHLY PRICE"
              />
            </ControlElement>
            <ControlElement>
              <Input
                name="total"
                type="text"
                readOnly
                value={total}
                label="TOTAL PRICE"
              />
            </ControlElement>
          </div>
        </Content>
      </Form>
    </Container>
  );
}
