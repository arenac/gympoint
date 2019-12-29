export function registerRequest(student) {
  return {
    type: '@student/REGISTER_REQUEST',
    payload: { student },
  };
}

export function updateRequest(id, student) {
  return {
    type: '@student/UPDATE_REQUEST',
    payload: { id, student },
  };
}

export function deleteRequest(id) {
  return {
    type: '@student/DELETE_REQUEST',
    payload: { id },
  };
}

export function requestSuccess() {
  return {
    type: '@student/REQUEST_SUCCESS',
  };
}

export function requestFailure() {
  return {
    type: '@student/REQUEST_FAILURE',
  };
}
