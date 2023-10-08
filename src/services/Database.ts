import mongoose from 'mongoose';

import { IDatabaseConfig } from '../types';

export default async (config: IDatabaseConfig) => {
  try {
    const dbURI = config.mongoURI;

    await mongoose.connect(dbURI, {});
    console.log('Connected to database successfully');
  } catch (error) {
    console.error('Error while connecting to database:', error);
    throw error
  }
};
