import { IRouter, Router } from 'express';

import { validationHandler } from '../../middlewares';
import * as bookController from './userController';
import validations from './validations';

const router: IRouter = Router();

router.get(
  '/',
  validationHandler(validations.list),
  bookController.list,
);

export default router;
