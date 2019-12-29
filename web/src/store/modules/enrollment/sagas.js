import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { requestSuccess, requestFailure } from './actions';

export function* register({ payload }) {
  try {
    const { enrollment } = payload;

    yield call(api.post, 'enrollments', enrollment);

    yield put(requestSuccess());
    toast.success('Enrollment resgitered');
  } catch (err) {
    toast.error('Failure to register enrollment');
    yield put(requestFailure());
  }
}

export function* update({ payload }) {
  try {
    const { id, enrollment } = payload;

    yield call(api.put, `enrollments/${id}`, enrollment);

    yield put(requestSuccess());

    toast.success('Enrollment updated');
  } catch (err) {
    toast.error('Failure to update a enrollment');
    yield put(requestFailure());
  }
}

export function* deleteEnrollment({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `enrollments/${id}`);

    yield put(requestSuccess());

    toast.warn('Enrollment deleted');
  } catch (err) {
    toast.error('Failure to register a enrollment');
    yield put(requestFailure());
  }
}

export default all([
  takeLatest('@enrollment/REGISTER_REQUEST', register),
  takeLatest('@enrollment/UPDATE_REQUEST', update),
  takeLatest('@enrollment/DELETE_REQUEST', deleteEnrollment),
]);
