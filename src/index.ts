import config from './config/configuration';
import App from './App';

const server = new App(config);
server.listen();
