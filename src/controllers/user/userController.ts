import { Request, Response } from 'express';

import userRepository from '../../repositories/user/UserRepository';
import { IListInput, IUser } from '../../types/interfaces';

export const list = async (req: Request, res: Response) => {
  try {
    const { skip, limit } = req.query as IListInput;
    const users: IUser[] = await userRepository.list(skip, limit);

    return res.status(200).json(users);
  } catch (error) {
    throw error;
  }
};
