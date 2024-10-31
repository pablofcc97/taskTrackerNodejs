// src/socketHandlers/task.socketHandler.js

const taskAdvanceHandlers = (socket, io) => {

    socket.on('taskAdvanceCompleted', (taskAdvanceData) => {
        console.log('Nuevo avance completado:', taskAdvanceData);
        io.emit('newTaskAdvanceCompleted', taskAdvanceData);
    });

    // Agrega más eventos relacionados con tareas según lo necesites
};

export default taskAdvanceHandlers;
