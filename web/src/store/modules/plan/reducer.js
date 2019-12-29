import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
};

export default function plan(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@plan/REGISTER_REQUEST':
      case '@plan/UPDATE_REQUEST':
      case '@plan/DELETE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@plan/REQUEST_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@plan/REQUEST_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
