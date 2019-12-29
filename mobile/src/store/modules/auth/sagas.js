import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { validateSuccess, validateFailure } from './actions';

export function* validateStudent({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `sessions/students/${id}`);

    const { id: _id } = response.data;

    if (id !== String(_id)) {
      Alert.alert('Student validation error', 'Invalid student id');
      yield put(validateFailure());
    }

    yield put(validateSuccess(response.data));
  } catch (err) {
    Alert.alert('Student validation error', 'Student validation error');
    yield put(validateFailure());
  }
}

export default all([takeLatest('@student/VALIDATE_REQUEST', validateStudent)]);
