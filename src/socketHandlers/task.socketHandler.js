// src/socketHandlers/task.socketHandler.js

const taskHandlers = (socket, io) => {
    socket.on('taskCreated', (taskData) => {
        console.log('Nueva tarea creada:', taskData);
        io.emit('newTask', taskData); // Emite el evento a todos los clientes
    });

    // Agrega más eventos relacionados con tareas según lo necesites
};

export default taskHandlers;
