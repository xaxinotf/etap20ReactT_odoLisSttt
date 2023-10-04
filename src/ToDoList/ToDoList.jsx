import React, { useState, useEffect } from 'react';
import './todoliststyle.css';

export default function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState("");
    const [editTaskId, setEditTaskId] = useState(null);

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    const saveTasksToLocalStorage = (updatedTasks) => {
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const handleAddTask = () => {
        if (taskText.trim() === '') {
            return;
        }

        const newTask = {
            id: Date.now(),
            text: taskText,
        };

        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        saveTasksToLocalStorage(updatedTasks);
        setTaskText('');
    };

    const handleEditTask = (taskId) => {
        setEditTaskId(taskId);
        const taskToEdit = tasks.find((task) => task.id === taskId);
        if (taskToEdit) {
            setTaskText(taskToEdit.text);
        }
    };

    const handleSaveTask = () => {
        if (taskText.trim() === '') {
            return;
        }

        const updatedTasks = tasks.map((task) => {
            if (task.id === editTaskId) {
                return { ...task, text: taskText };
            }
            return task;
        });

        setTasks(updatedTasks);
        saveTasksToLocalStorage(updatedTasks);
        setTaskText('');
        setEditTaskId(null);
    };

    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        saveTasksToLocalStorage(updatedTasks);
        setEditTaskId(null);
    };

    const containerStyle = {
        backgroundColor: 'purple',
        color: 'white',
        padding: '100px',
        borderRadius: '10px',
    };

    const addButtonStyle = {
        backgroundColor: 'purple',
        color: 'white',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease',
        cursor: 'pointer',
        border: '2px solid white', // Add white border
    };

    const taskListStyle = {
        listStyleType: 'none',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    };

    const taskItemStyle = {
        backgroundColor: 'pink',
        padding: '10px',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const deleteButtonStyle = {
        backgroundColor: 'purple',
        color: 'white',
        border: 'none',
        borderRadius: '3px',
        transition: 'background-color 0.3s ease',
        cursor: 'pointer',
        marginRight: '1px',
    };

    const editButtonStyle = {
        backgroundColor: 'purple',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease',
        cursor: 'pointer',
    };

    const inputFieldStyle = {
        backgroundColor: 'pink',
        borderRadius: '5px',
        width: '200px',
    };

    return (
        <div className="todo-container" style={containerStyle}>
            <h2 style={{ color: 'white' }}>Tasks</h2>
            <ul className="task-list" style={taskListStyle}>
                {tasks.map((task) => (
                    <li key={task.id} style={taskItemStyle}>
                        {editTaskId === task.id ? (
                            <>
                                <input
                                    type="text"
                                    value={taskText}
                                    onChange={(e) => setTaskText(e.target.value)}
                                    className="task-input"
                                    style={inputFieldStyle}
                                />
                                <button onClick={handleSaveTask} style={editButtonStyle}>
                                    Save
                                </button>
                            </>
                        ) : (
                            <>
                                {task.text}
                                <button
                                    onClick={() => handleEditTask(task.id)}
                                    style={editButtonStyle}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteTask(task.id)}
                                    style={deleteButtonStyle}
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                className="task-input"
                style={inputFieldStyle}
            />
            <button onClick={handleAddTask} className="add-button" style={addButtonStyle}>
                Add Task
            </button>
        </div>
    );
}
