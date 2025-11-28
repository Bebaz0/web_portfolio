import React, { useState } from 'react';
import './Todo.css'
import { useTranslation } from 'react-i18next';

function Todo() {
    const { t } = useTranslation();

    const [tasks, setTasks] = useState([
        { text: "tryTodo", completed: false },
        { text: "switchLanguage", completed: false },
        { text: "exploreProjects", completed: false },
        { text: "visitSocial", completed: false },
        { text: "readAbout", completed: false },
        { text: "sendMessage", completed: false },
        { text: "goTop", completed: false }
    ]);

    const toggleTask = (index) => {
        const newTasks = [...tasks];

        newTasks[index].completed = !newTasks[index].completed;

        newTasks.sort((a, b) => Number(a.completed) - Number(b.completed));

        setTasks(newTasks);
    };

    return (
        <div className="tasks-Wrapper">
            <h1>{t('todo.title')}</h1>
            <div className="task-list">
                {tasks.map((task, index) => (
                    <div
                        className={`task ${task.completed ? 'active' : ''}`}
                        key={index}
                        onClick={() => toggleTask(index)}
                    >
                        <div className="checkbox-custom"></div>
                        <label>{t(`todo.tasks.${task.text}`)}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Todo;