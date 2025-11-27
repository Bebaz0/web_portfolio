import React, { useState } from 'react';
import './Todo.css'

function Todo() {
    const [tasks, setTasks] = useState([
        { text: "Explore my projects", completed: false },
        { text: "Visit my social media", completed: true },
        { text: "Try the to-do list", completed: false },
        { text: "Read the About Me section", completed: false },
        { text: "Switch the website language", completed: false },
        { text: "Send me a message", completed: false },
        { text: "Go back to the top", completed: false }
    ]);

    const toggleTask = (index) => {
        const newTasks = [...tasks];

        newTasks[index].completed = !newTasks[index].completed;

        newTasks.sort((a, b) => Number(a.completed) - Number(b.completed));

        setTasks(newTasks);
    };

    return (
        <div className="tasks-Wrapper">
            <h1>Portfolio ToDo</h1>
            <div className="task-list">
                {tasks.map((task, index) => (
                    <div
                        className={`task ${task.completed ? 'active' : ''}`}
                        key={index}
                        onClick={() => toggleTask(index)}
                    >
                        <div className="checkbox-custom"></div>
                        <label>{task.text}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Todo;