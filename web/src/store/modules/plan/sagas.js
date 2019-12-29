import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { requestSuccess, requestFailure } from './actions';

export function* register({ payload }) {
  try {
    const { title, duration, price } = payload.plan;

    yield call(api.post, 'plans', {
      title,
      duration: Number(duration),
      price: parseFloat(price),
    });

    yield put(requestSuccess());

    toast.success('Plan resgitered');
  } catch (err) {
    toast.error('Failure to register a plan');
    yield put(requestFailure());
  }
}

export function* update({ payload }) {
  try {
    const { id } = payload;
    const { title, duration, price } = payload.plan;

    yield call(api.put, `plans/${id}`, {
      title,
      duration: Number(duration),
      price: parseFloat(price),
    });

    yield put(requestSuccess());

    toast.success('Plan updated');
  } catch (err) {
    toast.error('Failure to update a plan');
    yield put(requestFailure());
  }
}

export function* deletePlan({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `plans/${id}`);

    yield put(requestSuccess());

    toast.warn('Plan deleted');
  } catch (err) {
    toast.error('Failure to register a plan');
    yield put(requestFailure());
  }
}

export default all([
  takeLatest('@plan/REGISTER_REQUEST', register),
  takeLatest('@plan/UPDATE_REQUEST', update),
  takeLatest('@plan/DELETE_REQUEST', deletePlan),
]);
