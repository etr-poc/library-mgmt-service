import { Request, Response, NextFunction } from 'express';

export default (err: Error, _: Request, res: Response, __: NextFunction) => {
  console.error(err);

  res.status(500).json({
    message: err.message || 'Internal Server Error',
  });
}
