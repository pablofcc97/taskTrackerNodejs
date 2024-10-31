// src/socketHandlers/index.socketHandler.js
import taskHandlers from './task.socketHandler.js';
import taskAdvanceHandlers from './taskAdvance.socketHandler.js';
// Puedes agregar más manejadores, por ejemplo: import advanceHandlers from './advance.socketHandler.js';

const setupSocketHandlers = (io) => {
    io.on('connection', (socket) => {
        console.log('SOCKET Un usuario entró:', socket.id);

        // Inicializa manejadores específicos, pasándoles el socket y el io
        taskHandlers(socket, io);
        taskAdvanceHandlers(socket, io);
        // advanceHandlers(socket, io); // Puedes habilitar esto si tienes eventos en advance.socketHandler.js

        socket.on('disconnect', () => {
            console.log('SOCKET Un usuario salió:', socket.id);
        });
    });
};

export default setupSocketHandlers;
