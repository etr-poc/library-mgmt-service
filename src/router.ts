import { Router, IRouter } from 'express';

import bookRoutes from './controllers/book/routes';
import userRoutes from './controllers/user/routes';

const router: IRouter = Router();

router.use('/books', bookRoutes);
router.use('/users', userRoutes);

export default router;
