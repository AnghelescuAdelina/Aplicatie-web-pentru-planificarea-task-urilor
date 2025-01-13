import React, { useState, useEffect } from 'react';
import '../components/ManagerPanel.css';

function ManagerPanel({ users, tasks, setTasks }) {
    const [taskDescription, setTaskDescription] = useState('');
    const [assignTask, setAssignTask] = useState('');
    const [assignExecutant, setAssignExecutant] = useState('');
    const [filteredTasks, setFilteredTasks] = useState({ OPEN: [], PENDING: [], COMPLETED: []});

    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, [setTasks]);

    useEffect(() => {
        const categorizedTasks = tasks.reduce(
            (acc, task, index) => {
                acc[task.status].push({ ...task, index });
                return acc;
            },
            { OPEN: [], PENDING: [], COMPLETED: []}
        );
        setFilteredTasks(categorizedTasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks, setTasks]); 

    const createTask = () => {
        if (taskDescription.trim()) {
            const newTask = { description: taskDescription, status: 'OPEN', assignedTo: null };
            setTasks((prev) => [...prev, newTask]);
            setTaskDescription('');
        }
    };

    const assignTaskToExecutant = () => {
        if (assignTask && assignExecutant) {
            setTasks((prev) =>
                prev.map((task, idx) =>
                    idx === parseInt(assignTask)
                        ? { ...task, assignedTo: users[assignExecutant].name, status: 'PENDING' }
                        : task
                )
            );
            setAssignTask('');
            setAssignExecutant('');
        }
    };

    const handleTaskCompletion = (taskIndex) => {
        setTasks((prev) =>
            prev.map((task, idx) =>
                idx === taskIndex ? { ...task, status: 'COMPLETED' } : task
            )
        );
    };

    return (
        <div>
            <h2>Manager Panel</h2>
            <input
                type="text"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Task Description"
            />
            <button onClick={createTask}>Create Task</button>

            <h3>Tasks (OPEN)</h3>
            <ul>
                {filteredTasks.OPEN.map((task) => (
                    <li key={task.index}>
                        {task.description}
                    </li>
                ))}
            </ul>

            <h3>Tasks (PENDING)</h3>
            <ul>
                {filteredTasks.PENDING.map((task) => (
                    <li key={task.index}>
                        {task.description} - Assigned to {task.assignedTo}
                        <button onClick={() => handleTaskCompletion(task.index)}>Mark as Completed</button>
                    </li>
                ))}
            </ul>

            <h3>Tasks (COMPLETED)</h3>
            <ul>
                {filteredTasks.COMPLETED.map((task) => (
                    <li key={task.index}>{task.description}</li>
                ))}
            </ul>

            

            <h3>Assign Task to Executant</h3>
            <select value={assignTask} onChange={(e) => setAssignTask(e.target.value)}>
                <option value="">Select Task</option>
                {filteredTasks.OPEN.map((task) => (
                    <option key={task.index} value={task.index}>
                        {task.description}
                    </option>
                ))}
            </select>

            <select value={assignExecutant} onChange={(e) => setAssignExecutant(e.target.value)}>
                <option value="">Select Executant</option>
                {users.map(
                    (user, idx) =>
                        user.role === 'executant' && (
                            <option key={idx} value={idx}>
                                {user.name}
                            </option>
                        )
                )}
            </select>
            <button onClick={assignTaskToExecutant}>Assign Task</button>
        </div>
    );
}

export default ManagerPanel;