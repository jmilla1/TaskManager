import React, { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import moment from 'moment';

function TaskForm({ addTask }) {
    const [name, setName] = useState('');
    const [deadline, setDeadline] = useState(moment().format('YYYY-MM-DD'));

    const validator = useRef(new SimpleReactValidator({
        validators: {
            date: {  
                message: 'La fecha límite debe ser válida.',
                rule: (val) => moment(val, 'YYYY-MM-DD', true).isValid(),
                required: true
            }
        }
    }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validator.current.allValid()) {
            const newTask = { name, deadline, createdAt: serverTimestamp() };
            try {
                const docRef = await addDoc(collection(db, "tasks"), newTask);
                addTask({ id: docRef.id, ...newTask });
                setName('');
                setDeadline(moment().format('YYYY-MM-DD'));
            } catch (error) {
                console.error("Error al agregar la tarea: ", error);
            }
        } else {
            validator.current.showMessages();
        }
    };

    const handleDeadlineChange = (e) => {
        const selectedDate = moment(e.target.value, 'YYYY-MM-DD');
        setDeadline(selectedDate.format('YYYY-MM-DD'));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre de la Tarea:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => validator.current.showMessageFor('name')}
                />
                {validator.current.message('name', name, 'required')}
            </div>
            <div>
                <label>Fecha Límite:</label>
                <input
                    type="date"
                    value={deadline}
                    onChange={handleDeadlineChange}
                    onBlur={() => validator.current.showMessageFor('deadline')}
                />
                {validator.current.message('deadline', deadline, 'required|date')}
            </div>
            <button type="submit">Guardar Tarea</button>
        </form>
    );
}

export default TaskForm;