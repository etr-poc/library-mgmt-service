import { config } from 'dotenv';
import { IAppConfig, IDatabaseConfig, IServerConfig } from '../types';

config();

const dbConfig: IDatabaseConfig = Object.freeze({
  mongoURI: process.env.MONGO_URI || '',
});

const serverConfig: IServerConfig = Object.freeze({
  port: parseInt(process.env.PORT || '4000'),
  logFormat: process.env.LOG_FORMAT || 'combined',
})

const configuration: IAppConfig = Object.freeze({
  database: dbConfig,
  server: serverConfig,
})

export default configuration;
