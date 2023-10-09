import React, { useState, useEffect } from 'react';
import './ToDoList.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableTask from "./DraggableTask";
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
export default function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState("");

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    const saveTasksToLocalStorage = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const handleAddTask = () => {
        if (taskText.trim() === '') {
            return;
        }

        const newTask = {
            id: Date.now(),
            text: taskText
        };

        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        saveTasksToLocalStorage(updatedTasks);
        setTaskText('');
    };

    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        saveTasksToLocalStorage(updatedTasks);
    };

    const handleMoveTask = (dragIndex, hoverIndex) => {
        const dragTask = tasks[dragIndex];
        const updatedTasks = [...tasks];
        updatedTasks.splice(dragIndex, 1);
        updatedTasks.splice(hoverIndex, 0, dragTask);
        setTasks(updatedTasks);
        saveTasksToLocalStorage(updatedTasks);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="todo-container">
                <h2>Tasks</h2>
                <div className="task-container">
                    <input
                        type="text"
                        value={taskText}
                        onChange={(e) => setTaskText(e.target.value)}
                        className="task-input"
                        placeholder="Enter a new task"
                    />
                    <button onClick={handleAddTask} className="add-button">Add Task</button>
                    <ul className="task-list purple-background">
                        {tasks.map((task, index) => (
                            <DraggableTask
                                key={task.id}
                                task={{ ...task, index }}
                                onMove={handleMoveTask}
                                onDelete={handleDeleteTask}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </DndProvider>
    );
}
