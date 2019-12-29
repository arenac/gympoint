import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { format, parseISO } from 'date-fns';
import en from 'date-fns/locale/en-US';

import api from '~/services/api';
import { deleteRequest } from '~/store/modules/enrollment/actions';

import {
  Container,
  Header,
  Content,
  EnrollmentTable,
  DeleteButton,
} from './styles';

export default function Enrollments() {
  const dispatch = useDispatch();
  const [enrollments, setEnrollments] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`enrollments?page=${page}`);

      const data = response.data.map(enrollment => {
        return {
          ...enrollment,
          plan_id: enrollment.plan.id,
          // student_id :enrollment.student.id,
          start_date: parseISO(enrollment.start_date),

          startDateFormatted: format(
            parseISO(enrollment.start_date),
            "dd'-'MMMM'-'Y",
            { locale: en }
          ),

          endDateFormatted: format(
            parseISO(enrollment.end_date),
            "dd'-'MMMM'-'Y",
            { locale: en }
          ),
        };
      });

      setEnrollments(data);
    }
    fetchData();
  }, [page]);

  function handleDeleteStudent(id) {
    dispatch(deleteRequest(id));

    const _enrollments = enrollments.filter(item => item.id !== id);
    setEnrollments(_enrollments);
  }

  return (
    <Container>
      <Header>
        <strong>Enrollment List</strong>
        <aside>
          <Link to="/enrollments/register">REGISTER</Link>
        </aside>
      </Header>
      <Content>
        <EnrollmentTable>
          <thead>
            <tr>
              <th>STUDENT</th>
              <th className="alignCenter">PLAN</th>
              <th className="alignCenter">START</th>
              <th className="alignCenter">END</th>
              <th className="alignCenter">ACTIVE</th>
              <th />
              <th id="enrollment-delete-col" />
            </tr>
          </thead>
          <tbody>
            {enrollments.map(enrollment => (
              <tr key={enrollment.id}>
                <td>{enrollment.student ? enrollment.student.name : ''}</td>
                <td className="alignCenter">
                  {enrollment.plan ? enrollment.plan.title : ''}
                </td>
                <td className="alignCenter">{enrollment.startDateFormatted}</td>
                <td className="alignCenter">{enrollment.endDateFormatted}</td>
                <td className="alignCenter">{enrollment.active}</td>
                <td align="right">
                  <Link
                    to={{
                      pathname: '/enrollments/edit',
                      state: {
                        enrollment,
                      },
                    }}
                  >
                    edit
                  </Link>
                </td>
                <td align="left">
                  <DeleteButton
                    type="button"
                    onClick={() => handleDeleteStudent(enrollment.id)}
                  >
                    delete
                  </DeleteButton>
                </td>
              </tr>
            ))}
          </tbody>
        </EnrollmentTable>
      </Content>
    </Container>
  );
}
