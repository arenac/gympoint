import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import api from '~/services/api';

import { deleteRequest } from '~/store/modules/student/actions';

import {
  Container,
  Header,
  Content,
  StudentTable,
  EditButton,
  DeleteButton,
} from './styles';

export default function Students() {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [page, setPage] = useState(1);
  const [studentToSearch, setStudentToSearch] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(
        `students?page=${page}&student_name=${studentToSearch}`
      );
      setStudents(response.data);
    }

    fetchData();
  }, [page, studentToSearch]);

  function handleEditStudent(student) {
    setStudentToEdit(student);
  }

  function handleDeleteStudent(id) {
    dispatch(deleteRequest(id));

    const _students = students.filter(item => item.id !== id);
    setStudents(_students);
  }

  function handleStudentSearch(event) {
    setStudentToSearch(event.target.value);
  }

  return (
    <Container>
      <Header>
        <strong>Stundent List</strong>
        <aside>
          <Link to="/students/register">REGISTER</Link>
          <input
            type="text"
            placeholder="Student search"
            onChange={handleStudentSearch}
          />
        </aside>
      </Header>
      <Content>
        <StudentTable>
          <thead>
            <tr>
              <th>NAME</th>
              <th>E-MAIL</th>
              <th>AGE</th>
              <th />
              <th id="delete-column" />
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td align="right">
                  <Link
                    to={{
                      pathname: '/students/edit',
                      state: {
                        student,
                      },
                    }}
                  >
                    edit
                  </Link>
                </td>
                <td align="left">
                  <DeleteButton
                    type="button"
                    onClick={() => handleDeleteStudent(student.id)}
                  >
                    delete
                  </DeleteButton>
                </td>
              </tr>
            ))}
          </tbody>
        </StudentTable>
      </Content>
    </Container>
  );
}
