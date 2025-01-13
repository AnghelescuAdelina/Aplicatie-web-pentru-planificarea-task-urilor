import React, { useState, useEffect } from 'react';
import '../components/ExecutantPanel.css';

function ExecutantPanel({ tasks, currentUser, setTasks }) {
    const [pendingTasks, setPendingTasks] = useState([]);
    const [pastTasks, setPastTasks] = useState([]);

    useEffect(() => {
        const userTasks = tasks.filter((task) => task.assignedTo === currentUser.name);
        setPendingTasks(userTasks.filter((task) => task.status === 'PENDING'));
        setPastTasks(userTasks.filter((task) => task.status === 'COMPLETED' || task.status === 'CLOSED'));
    }, [tasks, currentUser]);

    const markTaskCompleted = (taskIndex) => {
        const taskToComplete = pendingTasks.find((task) => task.index === taskIndex);

        setTasks((prev) =>
            prev.map((task) =>
                task.index === taskToComplete.index ? { ...task, status: 'COMPLETED' } : task
            )
        );

        setPendingTasks((prev) => prev.filter((task) => task.index !== taskIndex));

      
        setPastTasks((prev) => [...prev, { ...taskToComplete, status: 'COMPLETED' }]);
    };

    return (
        <div>
            <h2>Executant Panel</h2>
            <h3>Pending Tasks</h3>
            <ul>
                {pendingTasks.map((task) => (
                    <li key={task.index}>
                        {task.description}
                        <button onClick={() => markTaskCompleted(task.index)}>Mark as Completed</button>
                    </li>
                ))}
            </ul>

            <h3>Past Tasks</h3>
            <ul>
                {pastTasks.map((task) => (
                    <li key={task.index}>
                        {task.description} - {task.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ExecutantPanel;
