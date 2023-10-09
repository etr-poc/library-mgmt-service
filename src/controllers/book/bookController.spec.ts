import { Request, Response } from 'express';
import * as sinon from 'sinon';

import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../config/constant';
import BaseRepository from '../../repositories/BaseRepository';
import { MOCK_BOOKS, MOCK_USER_BOOKS, MOCK_USERS } from './mock/data';
import * as bookController from './bookController';

describe('Book Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  let mockAggregate = sinon.stub(BaseRepository.prototype, 'aggregate');
  let mockFindByQuery = sinon.stub(BaseRepository.prototype, 'findByQuery');
  let mockUpdate = sinon.stub(BaseRepository.prototype, 'findByIdAndUpdate');

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach((done) => {
    mockAggregate.restore();
    mockFindByQuery.restore();
    mockUpdate.restore();

    mockAggregate = sinon.stub(BaseRepository.prototype, 'aggregate');
    mockFindByQuery = sinon.stub(BaseRepository.prototype, 'findByQuery');
    mockUpdate = sinon.stub(BaseRepository.prototype, 'findByIdAndUpdate');
    done();
  })

  describe('List', () => {
    it('should return empty book list if data not present', async () => {
      mockAggregate.callsFake(() => Promise.resolve([]));

      mockRequest.query = {};
      await bookController.list(mockRequest as Request, mockResponse as Response);
  
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith([]);
    });

    it('should return book list for the provided skip and limit', async () => {
      mockAggregate.callsFake(() => Promise.resolve(MOCK_BOOKS));

      mockRequest.query = { skip: 1, limit: 4 } as any;
      await bookController.list(mockRequest as Request, mockResponse as Response);
  
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(MOCK_BOOKS);
    });

    it('should return book list for the provided userId', async () => {
      mockAggregate.callsFake(() => Promise.resolve(MOCK_USER_BOOKS));

      mockRequest.query = { userId: '65225b7caa8c636651b26d60' };
      await bookController.list(mockRequest as Request, mockResponse as Response);
  
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(MOCK_USER_BOOKS);
    });

    it('should throw an error if somethin went wrong while aggregating data', async () => {
      const error = new Error('Can not aggregate data');
      mockAggregate.throws(error);

      try {
        mockRequest.query = {};
        await bookController.list(mockRequest as Request, mockResponse as Response);
      } catch (e) {
        expect(e).toEqual(error);
      }
    });
  });

  describe('Borrow Book', () => {
    it('should return error if user not found', async () => {
      mockAggregate.callsFake(() => Promise.resolve(MOCK_USER_BOOKS));
      mockFindByQuery.onFirstCall().resolves(null);

      mockRequest.params = { id: '65225b7caa8c636651b26cfc', userId: '65225b7caa8c636651b26d61'};
      await bookController.borrowBook(mockRequest as Request, mockResponse as Response);
  
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: ERROR_MESSAGES.userNotFound });
    });

    it('should return error if user already borrowed maximum books', async () => {
      mockAggregate.callsFake(() => Promise.resolve(MOCK_BOOKS));
      mockFindByQuery.onFirstCall().resolves(MOCK_USERS[0]);

      mockRequest.params = { id: '65225b7caa8c636651b26cfc', userId: '65225b7caa8c636651b26d61'};
      await bookController.borrowBook(mockRequest as Request, mockResponse as Response);
  
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: ERROR_MESSAGES.maximumBookLimit });
    });

    it('should return error if book is not available for borrowing', async () => {
      mockAggregate.callsFake(() => Promise.resolve(MOCK_USER_BOOKS));
      mockFindByQuery
        .onFirstCall().resolves(MOCK_USERS[0])
        .onSecondCall().resolves(null);

      mockRequest.params = { id: '65225b7caa8c636651b26cfc', userId: '65225b7caa8c636651b26d61'};
      await bookController.borrowBook(mockRequest as Request, mockResponse as Response);
  
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: ERROR_MESSAGES.bookNotForBorrow });
    });

    it('should borrow book successfully', async () => {
      mockAggregate.callsFake(() => Promise.resolve(MOCK_USER_BOOKS));
      mockFindByQuery
        .onFirstCall().resolves(MOCK_USERS[0])
        .onSecondCall().resolves(MOCK_BOOKS[0]);

      mockRequest.params = { id: '65225b7caa8c636651b26cfc', userId: '65225b7caa8c636651b26d61'};
      await bookController.borrowBook(mockRequest as Request, mockResponse as Response);
  
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: SUCCESS_MESSAGES.bookBorrowd });
    });

    it('should throw an error if somethin went wrong while borrowing book', async () => {
      const error = new Error('Can not borrow book');
      mockAggregate.throws(error);

      try {
        mockRequest.params = { id: '65225b7caa8c636651b26cfc', userId: '65225b7caa8c636651b26d61'};
        await bookController.borrowBook(mockRequest as Request, mockResponse as Response);
      } catch (e) {
        expect(e).toEqual(error);
      }
    });
  });

  describe('Return Book', () => {
    it('should return error if user not found', async () => {
      mockFindByQuery.onFirstCall().resolves(null);

      mockRequest.params = { id: '65225b7caa8c636651b26cfc', userId: '65225b7caa8c636651b26d61'};
      await bookController.returnBook(mockRequest as Request, mockResponse as Response);
  
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: ERROR_MESSAGES.userNotFound });
    });

    it('should return error if book is not available for returning', async () => {
      mockFindByQuery
        .onFirstCall().resolves(MOCK_USERS[0])
        .onSecondCall().resolves(null);

      mockRequest.params = { id: '65225b7caa8c636651b26cfc', userId: '65225b7caa8c636651b26d61'};
      await bookController.returnBook(mockRequest as Request, mockResponse as Response);
  
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: ERROR_MESSAGES.bookNotForReturn });
    });

    it('should return book successfully', async () => {
      mockFindByQuery
        .onFirstCall().resolves(MOCK_USERS[0])
        .onSecondCall().resolves(MOCK_BOOKS[0]);

      mockRequest.params = { id: '65225b7caa8c636651b26cfc', userId: '65225b7caa8c636651b26d61'};
      await bookController.returnBook(mockRequest as Request, mockResponse as Response);
  
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: SUCCESS_MESSAGES.bookReturned });
    });

    it('should throw an error if somethin went wrong while returning book', async () => {
      const error = new Error('Can not return book');
      mockFindByQuery.throws(error);

      try {
        mockRequest.params = { id: '65225b7caa8c636651b26cfc', userId: '65225b7caa8c636651b26d61'};
        await bookController.returnBook(mockRequest as Request, mockResponse as Response);
      } catch (e) {
        expect(e).toEqual(error);
      }
    });
  });
});
