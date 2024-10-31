// src/index.js
import 'dotenv/config';
import './initContainer.js';
import swaggerUi from 'swagger-ui-express';
import swaggerParser from '@apidevtools/swagger-parser';
import app from './app.js';
import config from './utils/config.js';
import { db } from './utils/database.js';
import './models/index.js';

// Socket.IO
import CustomContainer from './utils/customContainer.js';
import setupSocketHandlers from './socketHandlers/index.socketHandler.js';

const startServer = async () => {
    try {
        await db.authenticate();
        console.log('Conectando a la base de datos');

        if (config.env === 'development') {
            await db.sync({ force: true });
            console.log('Base de datos sincronizada y restablecida');
        }

        // Inicia el servidor HTTP
        app.listen(config.port, () => {
            console.log(`Servidor escuchando en el puerto ${config.port}`);
        });
    } catch (error) {
        console.error(error);
    }
};

const startWebSocketServer = () => {
    const container = CustomContainer.getInstance();
    const io = container.get('socketServer');
    const httpServer = container.get('createServer');

    // Configura los manejadores de Socket.IO usando setupSocketHandlers
    setupSocketHandlers(io);

    httpServer.listen(3500, () => {
        console.log(`WebSocket escuchando en el puerto 3500`);
    });
};

startServer();
startWebSocketServer();
