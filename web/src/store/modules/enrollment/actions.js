export function registerRequest(enrollment) {
  return {
    type: '@enrollment/REGISTER_REQUEST',
    payload: { enrollment },
  };
}

export function updateRequest(id, enrollment) {
  return {
    type: '@enrollment/UPDATE_REQUEST',
    payload: { id, enrollment },
  };
}

export function deleteRequest(id) {
  return {
    type: '@enrollment/DELETE_REQUEST',
    payload: { id },
  };
}

export function requestSuccess() {
  return {
    type: '@enrollment/REQUEST_SUCCESS',
  };
}

export function requestFailure() {
  return {
    type: '@enrollment/REQUEST_FAILURE',
  };
}
