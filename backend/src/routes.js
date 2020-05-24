import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();
//const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/users', UserController.index);

routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.delete('/users', UserController.destroy);

routes.post('/files', FileController.store);
routes.get('/files', FileController.index);

export default routes;
