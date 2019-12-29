import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { requestSuccess, requestFailure } from './actions';

export function* register({ payload }) {
  try {
    const { student } = payload;

    yield call(api.post, 'students', student);

    yield put(requestSuccess());
    toast.success('Student resgitered');
  } catch (err) {
    toast.error('Failure to register student');
    yield put(requestFailure());
  }
}

export function* update({ payload }) {
  try {
    const { id, student } = payload;

    yield call(api.put, `students/${id}`, student);

    yield put(requestSuccess());

    toast.success('Student updated');
  } catch (err) {
    toast.error('Failure to update student');
    yield put(requestFailure());
  }
}

export function* deleteStudent({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `students/${id}`);

    yield put(requestSuccess());

    toast.warn('Student deleted');
  } catch (err) {
    toast.error('Failure to register student');
    yield put(requestFailure());
  }
}

export default all([
  takeLatest('@student/REGISTER_REQUEST', register),
  takeLatest('@student/UPDATE_REQUEST', update),
  takeLatest('@student/DELETE_REQUEST', deleteStudent),
]);
