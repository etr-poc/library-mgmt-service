import { NextFunction, Request, Response } from 'express';
import errorMiddleware from './errorHandler';

describe('Error Middleware', () => {
  const mockNext: NextFunction = jest.fn();
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach((done) => {
    done();
  })

  it('should send a 500 status response with the custom error message', () => {
    const mockError = new Error('Test error message');

    errorMiddleware(mockError, mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Test error message',
    });
  });

  it('should send a 500 status response with the default error message', () => {
    const mockError = new Error();

    errorMiddleware(mockError, mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Internal Server Error',
    });
  });
});
