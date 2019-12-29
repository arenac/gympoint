import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import Students from '~/pages/Students';
import RegisterStudent from '~/pages/Students/components/RegisterStudent';
import EditStudent from '~/pages/Students/components/EditStudent';
import Plans from '~/pages/Plans';
import RegisterPlan from '~/pages/Plans/components/RegisterPlan';
import EditPlan from '~/pages/Plans/components/EditPlan';
import Enrollments from '~/pages/Enrollments';
import RegisterEnrollment from '~/pages/Enrollments/RegisterEnrollment';
import EditEnrollment from '~/pages/Enrollments/EditEnrollment';
import Help from '~/pages/Help';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/register" component={RegisterStudent} isPrivate />
      <Route path="/students/edit" component={EditStudent} isPrivate />

      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/plans/register" component={RegisterPlan} isPrivate />
      <Route path="/plans/edit" component={EditPlan} isPrivate />

      <Route path="/enrollments" exact component={Enrollments} isPrivate />
      <Route
        path="/enrollments/register"
        component={RegisterEnrollment}
        isPrivate
      />
      <Route path="/enrollments/edit" component={EditEnrollment} isPrivate />
      <Route path="/help" component={Help} isPrivate />
    </Switch>
  );
}
