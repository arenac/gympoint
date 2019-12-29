import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
};

export default function help(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@help/ANSWER_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@help/REQUEST_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@help/REQUEST_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
