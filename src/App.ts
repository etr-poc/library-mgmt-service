import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import { errorHandler } from './middlewares';
import router from './router';
import { connectToDatabase } from './services';
import { IAppConfig } from './types';

class App {
  public app: Application;
  private options: IAppConfig;

  constructor(options: IAppConfig) {
    this.app = express();
    this.options = options;
    this.config();
    this.routes();
    this.errorHandling();
    this.handleUncaughtErrors();
    this.createDBConnection();
  }

  private config(): void {
    // Enable CORS
    this.app.use(cors());

    // Parse JSON request bodies
    this.app.use(bodyParser.json());

    // Enable logging using Morgan
    this.app.use(morgan(this.options.server.logFormat));
  }

  private routes(): void {
    this.app.use('/api', router);

    this.app.use('/', (_: Request, res: Response) => {
      res.status(404).json({ message: 'Not found' });
    });
  }

  private errorHandling(): void {
    this.app.use(errorHandler);
  }
  
  private handleUncaughtErrors(): void {
    process.on('uncaughtException', (error: Error) => {
      console.error('Uncaught Exception:', error);
      process.exit(1);
    });
  }

  private async createDBConnection(): Promise<void> {
    await connectToDatabase(this.options.database);
  }

  public listen(): void {
    this.app.listen(this.options.server.port, () => {
      console.log(`Server is running on port ${this.options.server.port}`);
    });
  } 
}

export default App;
