import bookRepository from "../repositories/book/BookRepository";
import userRepository from "../repositories/user/UserRepository";

import { IBook, IUser } from '../types/interfaces';
import books from './data/books';
import users from './data/users';

export const seedData = () => {
  Promise.all([
    bookRepository.list(),
    userRepository.list(),
  ]).then(([bookData, userData]) => {
    if (!bookData.length && !userData.length) {
      Promise.all([
        bookRepository.bulkInsert(books as IBook[]),
        userRepository.bulkInsert(users as IUser[]),
      ]).then(() => {
        console.info('Data seeded successfully!');
      }).catch((e) => {
        console.error('Error occurred while seeding data', e);
      });
    }
  });
}
