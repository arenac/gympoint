import { combineReducers } from 'redux';

import auth from './auth/reducer';
import student from './student/reducer';
import plan from './plan/reducer';
import enrollment from './enrollment/reducer';
import help from './help/reducer';

export default combineReducers({ auth, student, plan, enrollment, help });
