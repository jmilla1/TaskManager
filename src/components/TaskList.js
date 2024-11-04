import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
            const tasksArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setTasks(tasksArray);
        });
        
        return unsubscribe;
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'tasks', id));
            alert('Tarea eliminada');
        } catch (error) {
            console.error('Error al eliminar la tarea: ', error);
        }
    };

    return (
        <div>
            <h2>Lista de Tareas</h2>
            {tasks.length === 0 ? (
                <p>No hay tareas pendientes</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <span>{task.name} - {task.deadline}</span>
                            <button onClick={() => handleDelete(task.id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TaskList;