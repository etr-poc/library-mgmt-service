import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import router from './router';
import { IAppConfig } from './types';

class App {
  public app: Application;
  private options: IAppConfig;

  constructor(options: IAppConfig) {
    this.app = express();
    this.options = options;
    this.config();
    this.routes();
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

  public listen(): void {
    this.app.listen(this.options.server.port, () => {
      console.log(`Server is running on port ${this.options.server.port}`);
    });
  } 
}

export default App;
