import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { requestSuccess, requestFailure } from './actions';

export function* answerQuestion({ payload }) {
  try {
    const { id, answer } = payload;

    yield call(api.post, `help-orders/${id}/answer`, answer);

    yield put(requestSuccess());
    toast.success('Question answerd successful');
  } catch (error) {
    yield put(requestFailure());
    toast.error('Can not send the answer');
  }
}

export default all([takeLatest('@help/ANSWER_REQUEST', answerQuestion)]);
