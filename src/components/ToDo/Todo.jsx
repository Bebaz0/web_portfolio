import React from 'react';
import './Todo.css'

function Todo() {
    const tasks = [
        "Explore my projects",
        "Visit my social media",
        "Try the to-do list",
        "Read the About Me section",
        "Switch the website language",
        "Send me a message",
        "Go back to the top"
    ];

    return (
        <div className={"tasks-Wrapper"}>
            <h1>Portfolio ToDO</h1>
            {tasks.map((task, index) => (
                <div className={"task"} key={index}>
                    <input type={"checkbox"} id={`task-${index}`}/>
                    <label htmlFor={`task-${index}`}>{task}</label>
                </div>
            ))}
        </div>
    );
}

export default Todo;