import mongoose from 'mongoose';
import dbConnect from './Database';

jest.mock('mongoose');

describe('Database Connection', () => {
  const mockConfig = {
    mongoURI: 'mongodb://localhost:27017/mydatabase',
  };

  it('should connect to the database successfully', async () => {
    mongoose.connect = jest.fn().mockResolvedValueOnce({});

    await dbConnect(mockConfig);

    expect(mongoose.connect).toHaveBeenCalledWith(mockConfig.mongoURI, {});
  });

  it('should handle errors while connecting to the database', async () => {
    const mockError = new Error('Test database connection error');
    mongoose.connect = jest.fn().mockRejectedValueOnce(mockError);

    try {
      await dbConnect(mockConfig);
    } catch (error) {
      expect(error).toBe(mockError);
    }
  });
});
