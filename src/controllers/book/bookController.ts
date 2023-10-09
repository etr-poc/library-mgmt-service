import { Request, Response } from 'express';

import {
  ERROR_MESSAGES,
  MAX_BORROW_LIMIT,
  SUCCESS_MESSAGES,
} from '../../config/constant';
import bookRepository from '../../repositories/book/BookRepository';
import userRepository from '../../repositories/user/UserRepository';
import { IBook, IListInput } from '../../types/interfaces';

export const list = async (req: Request, res: Response) => {
  try {
    const { userId, skip, limit } = req.query as IListInput;
    const books: IBook[] = await bookRepository.list(userId, skip, limit);

    return res.status(200).json(books);
  } catch (error) {
    throw error;
  }
};

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { id, userId } = req.params;
    const referenceIds: string[] = [];
  
    const [user, userBooks = []] = await Promise.all([
      userRepository.getById(userId),
      bookRepository.list(userId),
    ]);
  
    if (!user) {
      return res.status(400).json({ message: ERROR_MESSAGES.userNotFound });
    }
  
    if (userBooks && userBooks.length >= MAX_BORROW_LIMIT) {
      return res.status(400).json({ message: ERROR_MESSAGES.maximumBookLimit });
    }

    userBooks.forEach(({ referenceId }) => {
      referenceIds.push(referenceId);
    });

    const book = await bookRepository.getByQuery({
      originalId: id,
      isAvailable: true,
      referenceId: { $nin: referenceIds },
    });
  
    if (!book) {
      return res.status(400).json({ message: ERROR_MESSAGES.bookNotForBorrow });
    }
  
    await bookRepository.update(id, { borrowedBy: userId, isAvailable: false });
  
    return res.status(200).json({ message: SUCCESS_MESSAGES.bookBorrowd });
  } catch (error) {
    throw error;
  }
};

export const returnBook = async (req: Request, res: Response) => {
  try {
    const { id, userId } = req.params;
  
    const [user, book] = await Promise.all([
      userRepository.getById(userId),
      bookRepository.getByQuery({ originalId: id, isAvailable: false, borrowedBy: userId }),
    ]);
  
    if (!user) {
      return res.status(400).json({ message: ERROR_MESSAGES.userNotFound });
    }
  
    if (!book) {
      return res.status(400).json({ message: ERROR_MESSAGES.bookNotForReturn });
    }
  
    await bookRepository.update(id, { borrowedBy: null, isAvailable: true });
  
    return res.status(200).json({ message: SUCCESS_MESSAGES.bookReturned });
  } catch (error) {
    throw error
  }
};
