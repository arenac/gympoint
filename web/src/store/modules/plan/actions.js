export function registerRequest(plan) {
  return {
    type: '@plan/REGISTER_REQUEST',
    payload: { plan },
  };
}

export function updateRequest(id, plan) {
  return {
    type: '@plan/UPDATE_REQUEST',
    payload: { id, plan },
  };
}

export function deleteRequest(id) {
  return {
    type: '@plan/DELETE_REQUEST',
    payload: { id },
  };
}

export function requestSuccess() {
  return {
    type: '@plan/REQUEST_SUCCESS',
  };
}

export function requestFailure() {
  return {
    type: '@plan/REQUEST_FAILURE',
  };
}
