import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addMonths, format, parseISO } from 'date-fns';
import en from 'date-fns/locale/en-US';
import { Form, Input } from '@rocketseat/unform';

import ReactSelect from '../components/ReactSelect';
import ReactAsyncSelect from '../components/ReactAsyncSelect';
import DatePicker from '../components/DatePicker';

import api from '~/services/api';
import { formatPrice } from '~/utils/format';

import { updateRequest } from '~/store/modules/enrollment/actions';

import { Container, Header, Content, Label, ControlElement } from './styles';

export default function EnrollmentEdit({ history }) {
  const dispatch = useDispatch();
  const [plans, setPlans] = useState([]);
  const [priceFormated, setPriceFormated] = useState();
  const [choosedPlan, setChoosedPlan] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  const enrollmentPrevious = history.location.state.enrollment;

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans');

      const _plan = response.data.find(
        plan => plan.id === enrollmentPrevious.plan_id
      );
      setChoosedPlan(_plan);
      setPlans(response.data);
    }
    setStartDate(enrollmentPrevious.start_date);
    setPriceFormated(formatPrice(enrollmentPrevious.price));

    loadPlans();
  }, [
    enrollmentPrevious.plan_id,
    enrollmentPrevious.price,
    enrollmentPrevious.start_date,
  ]);

  const endDate = useMemo(() => {
    if (choosedPlan !== '' && startDate !== null) {
      const endDateFormatted = addMonths(startDate, choosedPlan.duration);

      setPriceFormated(formatPrice(choosedPlan.price * choosedPlan.duration));

      return format(endDateFormatted, "dd'/'MM'/'Y", { locale: en });
    }

    if (enrollmentPrevious && choosedPlan === '') {
      return format(parseISO(enrollmentPrevious.end_date), "dd'/'MM'/'Y", {
        locale: en,
      });
    }

    return '';
  }, [choosedPlan, enrollmentPrevious, startDate]);

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
      }, 1000);
    });

  function handleSubmit(data) {
    dispatch(updateRequest(enrollmentPrevious.id, data));
  }

  return (
    <Container>
      <Form initialData={enrollmentPrevious} onSubmit={handleSubmit}>
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
                <ReactAsyncSelect
                  name="student_id"
                  options={promiseOptions}
                  defaultValue={enrollmentPrevious}
                />
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
                  defaultValue={enrollmentPrevious.plan}
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
