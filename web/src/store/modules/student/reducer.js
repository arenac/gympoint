import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/REGISTER_REQUEST':
      case '@student/UPDATE_REQUEST':
      case '@student/DELETE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@student/REQUEST_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@student/REQUEST_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
