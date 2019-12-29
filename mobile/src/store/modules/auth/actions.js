export function validateRequest(id) {
  return {
    type: '@student/VALIDATE_REQUEST',
    payload: { id },
  };
}

export function validateSuccess(student) {
  return {
    type: '@student/VALIDATE_SUCCESS',
    payload: { student },
  };
}

export function validateFailure() {
  return {
    type: '@student/VALIDATE_FAILURE',
  };
}
