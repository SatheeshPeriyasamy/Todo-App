import React from 'react';
import type { Task } from '../../types';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onToggleTask: (id: string, is_complete: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>; 
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, loading, onToggleTask, onDelete }) => {
  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (tasks.length === 0) {
    return <p>No tasks available.</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <span>{task.title}</span>
          <button onClick={() => onToggleTask(task.id, task.is_complete)}>
            {task.is_complete ? 'Mark Incomplete' : 'Mark Complete'}
          </button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};