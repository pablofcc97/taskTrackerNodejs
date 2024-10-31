import 'dotenv/config';
import './initContainer.js'
import swaggerUi from 'swagger-ui-express';
import swaggerParser from '@apidevtools/swagger-parser';
import app from './app.js';
import config from './utils/config.js';
import { db } from './utils/database.js';
import './models/index.js';
//socket io
import {createServer} from 'http'
import { Server } from 'socket.io';


const startServer = async () => {
    try {
        const server = createServer(app); 
        const io = new Server(server, { cors: { origin: "*" } });

        await db.authenticate();
        console.log('Conectando a la base de datos');

        if (config.env === 'development') {
            await db.sync({ force: true });
            console.log('Base de datos sincronizada y restablecida');
        }

        // Configuración de Socket.IO
        io.on('connection', (socket) => {
            console.log('SOCKET Un usuario entró:', socket.id);

            socket.on('taskCreated', (taskData) => {
                console.log('Nueva tarea creada:', taskData);
                io.emit('newTask', taskData);
            });

            socket.on('taskAdvanceompleted', (taskAdvanceData) => {
                console.log('Nuevo avance completado:', taskAdvanceData);
                // Aquí puedes emitir la tarea a otros clientes o realizar más acciones
                io.emit('newTaskAdvanceCompleted', taskAdvanceData);
            });

            socket.on('disconnect', () => {
                console.log('SOCKET Un usuario salió:', socket.id);
            });
        });

        // Inicia el servidor en el puerto especificado
        server.listen(config.port, () => {
            console.log(`Servidor escuchando en el puerto ${config.port}`);
        });
    } catch (error) {
        console.error(error);
    }
};

startServer();
