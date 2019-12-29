import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Form } from '@rocketseat/unform';

import {
  registerRequest,
  updateRequest,
  showPlans,
} from '~/store/modules/plan/actions';
import { formatPrice } from '~/utils/format';

import { Container, Header, Content, Button, InputText } from './styles';

export default function PlanForm({ plan }) {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (plan) {
      setDuration(plan.duration);
      setPrice(plan.price);
      setTotal(formatPrice(duration * price));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTotal(formatPrice(Number(price) * Number(duration)));
  }, [duration, price]);

  function handleSubmit(data) {
    if (plan) {
      dispatch(updateRequest(plan.id, data));
    } else {
      dispatch(registerRequest(data));
    }
  }

  function handleReturn() {
    dispatch(showPlans(true));
  }

  return (
    <Container>
      <Form id="student-form" initialData={plan} onSubmit={handleSubmit}>
        <Header>
          <strong>{plan ? 'Edit a plan' : 'Register a plan'}</strong>
          <aside>
            <Button type="button" isgray onClick={handleReturn}>
              RETURN
            </Button>
            <Button type="submit">SAVE</Button>
          </aside>
        </Header>
        <Content>
          <InputText name="title" placeholder="Plan title" label="PLAN TITLE" />
          <div>
            <div>
              <InputText
                name="duration"
                type="number"
                placeholder="Duration (month)"
                onChange={event => setDuration(event.target.value)}
                label="DURATION"
              />
            </div>
            <div>
              <InputText
                name="price"
                type="number"
                placeholder="$ / month"
                onChange={event => setPrice(event.target.value)}
                label="MONTHLY PRICE"
              />
            </div>
            <div>
              <InputText
                name="total"
                type="text"
                disabled
                value={total}
                label="TOTAL PRICE"
              />
            </div>
          </div>
        </Content>
      </Form>
    </Container>
  );
}

PlanForm.propType = {
  plan: PropTypes.shape({
    duration: PropTypes.number,
    price: PropTypes.number,
  }),
};
