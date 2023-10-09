import { IRouter, Router } from 'express';

import { validationHandler } from '../../middlewares';
import * as bookController from './bookController';
import validations from './validations';

const router: IRouter = Router();

router.get(
  '/',
  validationHandler(validations.list),
  bookController.list,
);

router.put(
  '/borrow/:id/:userId',
  validationHandler(validations.update),
  bookController.borrowBook,
);

router.put(
  '/return/:id/:userId',
  validationHandler(validations.update),
  bookController.returnBook,
);

export default router;
