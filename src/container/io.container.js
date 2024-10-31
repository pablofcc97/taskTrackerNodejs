// io.container.js
import CustomContainer from '../utils/customContainer.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

const container = CustomContainer.getInstance();

container.add('corsConfig', () => ({ cors: { origin: "*" } }));
container.addClass('createServer', createServer, []);
container.addClass('socketServer', Server, ['createServer', 'corsConfig']);
