import { validationResult, checkSchema } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export default (schema: Record<string, any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(checkSchema(schema).map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).json({ errors: errors.array() });
  };
};
