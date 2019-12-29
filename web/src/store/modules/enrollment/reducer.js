import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  show: true,
};

export default function plan(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@enrollment/REGISTER_REQUEST':
      case '@enrollment/UPDATE_REQUEST':
      case '@enrollment/DELETE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@enrollment/REQUEST_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@enrollment/REQUEST_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
