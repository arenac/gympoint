import { Router } from 'express';

import SessionController from './app/controllers/SessionControlle';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';
import HelpQuestionController from './app/controllers/HelpQuestionController';
import HelpAnswerController from './app/controllers/HelpAnswerController';

import authMiddleware from './app/midlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.get('/sessions/students/:id', SessionController.index);

routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);

routes.get('/students/:id/help-orders', HelpQuestionController.index);
routes.post('/students/:id/help-orders', HelpQuestionController.store);

routes.use(authMiddleware);

routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.get('/enrollments', EnrollmentController.index);
routes.post('/enrollments', EnrollmentController.store);
routes.put('/enrollments/:id', EnrollmentController.update);
routes.delete('/enrollments/:id', EnrollmentController.delete);

routes.get('/help-orders', HelpAnswerController.index);
// route post as querired but i my view should be an update
routes.post('/help-orders/:id/answer', HelpAnswerController.store);

export default routes;
