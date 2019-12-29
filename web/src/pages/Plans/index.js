import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { formatPrice } from '~/utils/format';

import api from '~/services/api';

import { deleteRequest } from '~/store/modules/plan/actions';

import {
  Container,
  Header,
  Content,
  PlanTable,
  EditButton,
  DeleteButton,
} from './styles';

export default function Plans() {
  const dispatch = useDispatch();
  const [plans, setPlans] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`plans?page=${page}`);

      const data = response.data.map(plan => {
        return {
          ...plan,
          priceFormated: formatPrice(plan.price),
        };
      });

      setPlans(data);
    }

    fetchData();
  }, [page]);

  function handleDeletePlan(id) {
    dispatch(deleteRequest(id));

    const _plans = plans.filter(plan => plan.id !== id);

    setPlans(_plans);
  }

  return (
    <Container>
      <Header>
        <strong>Plan List</strong>
        <aside>
          <Link to="/plans/register">REGISTER</Link>
        </aside>
      </Header>
      <Content>
        <PlanTable>
          <thead>
            <tr>
              <th>TITLE</th>
              <th>DURATION</th>
              <th>PRICE</th>
              <th />
              <th id="delete-column" />
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan.id}>
                <td>{plan.title}</td>
                <td>
                  {plan.duration === 1
                    ? `${plan.duration} month`
                    : `${plan.duration} months`}
                </td>
                <td>{plan.priceFormated}</td>
                <td align="right">
                  <Link
                    to={{
                      pathname: '/plans/edit',
                      state: {
                        plan,
                      },
                    }}
                  >
                    edit
                  </Link>
                </td>
                <td align="left">
                  <DeleteButton
                    type="button"
                    onClick={() => handleDeletePlan(plan.id)}
                  >
                    delete
                  </DeleteButton>
                </td>
              </tr>
            ))}
          </tbody>
        </PlanTable>
      </Content>
    </Container>
  );
}
