import produce from 'immer';

const INITIAL_STATE = {
  student: null,
  isValid: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/VALIDATE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@student/VALIDATE_SUCCESS': {
        draft.student = action.payload.student;
        draft.isValid = true;
        draft.loading = false;

        break;
      }
      case '@student/VALIDATE_FAILURE': {
        draft.loading = false;

        break;
      }
      default:
    }
  });
}
