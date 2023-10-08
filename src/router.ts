import {IRouter, Request, Response, Router } from 'express';

const router: IRouter = Router();

router.get('/books', (req: Request, res: Response) => {
  res.status(200).json({ message: 'List of books' });
});

export default router;
