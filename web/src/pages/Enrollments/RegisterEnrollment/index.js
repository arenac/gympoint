import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addMonths, format } from 'date-fns';
import en from 'date-fns/locale/en-US';
import { Form, Input } from '@rocketseat/unform';

import ReactSelect from '../components/ReactSelect';
import ReactAsyncSelect from '../components/ReactAsyncSelect';
import DatePicker from '../components/DatePicker';

import api from '~/services/api';
import { formatPrice } from '~/utils/format';

import { registerRequest } from '~/store/modules/enrollment/actions';

import { Container, Header, Content, Label, ControlElement } from './styles';

export default function RegisterEnrollment() {
  const dispatch = useDispatch();
  const [plans, setPlans] = useState([]);
  const [choosedPlan, setChoosedPlan] = useState('');
  const [priceFormated, setPriceFormated] = useState('');
  const [startDate, setStartDate] = useState('');

  useEffect(() => {
    async function loadlans() {
      const response = await api.get('plans');
      setPlans(response.data);
    }

    loadlans();
  }, []);

  const endDate = useMemo(() => {
    if (choosedPlan !== '' && startDate !== '') {
      const endDateFormatted = addMonths(startDate, choosedPlan.duration);

      setPriceFormated(formatPrice(choosedPlan.price * choosedPlan.duration));

      return format(endDateFormatted, "dd'/'MM'/'Y", { locale: en });
    }

    return '';
  }, [choosedPlan, startDate]);

  const filterStudents = inputValue => {
    async function loadStudents() {
      const response = await api.get(`students?student_name=${inputValue}`);

      return response.data;
    }

    return loadStudents();
  };

  const promiseOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(filterStudents(inputValue));
      }, 200);
    });

  function handleSubmit(data) {
    dispatch(registerRequest(data));
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Header>
          <strong>Edit a enrollment</strong>
          <aside>
            <Link to="/enrollments">
              <button type="button">RETURN</button>
            </Link>
            <button type="submit">SAVE</button>
          </aside>
        </Header>
        <Content>
          <div className="editRow">
            <ControlElement>
              <Label>STUDENT</Label>
              <div className="selectStudent">
                <ReactAsyncSelect name="student_id" options={promiseOptions} />
              </div>
            </ControlElement>
          </div>
          <div className="editColumn">
            <ControlElement>
              <Label>PLAN</Label>
              <div className="selectElement">
                <ReactSelect
                  name="plan_id"
                  placeholder="Choose a plan"
                  className="basic-single"
                  classNamePrefix="select"
                  onChange={plan => setChoosedPlan(plan)}
                  options={plans}
                />
              </div>
            </ControlElement>
            <ControlElement>
              <Label>START DATE</Label>
              <DatePicker
                name="start_date"
                placeholder="Start date"
                onChangeDate={data => setStartDate(data)}
              />
            </ControlElement>
            <ControlElement>
              <Label>END DATE</Label>
              <Input name="end_date" value={endDate} readOnly />
            </ControlElement>
            <ControlElement>
              <Label>TOTAL PRICE</Label>
              <Input name="price" type="text" value={priceFormated} readOnly />
            </ControlElement>
          </div>
        </Content>
      </Form>
    </Container>
  );
}
