// import React from 'react';
// import { Task } from '../../types';
// import { TaskItem } from './TaskItem';

// interface TaskListProps {
//   tasks: Task[];
//   onToggleTask: (id: string, is_complete: boolean) => Promise<void>;
//   onDeleteTask: (id: string) => Promise<void>;
//   loading: boolean;
// }

// export function TaskList({ tasks, onToggleTask, onDeleteTask, loading }: TaskListProps) {
//   if (loading) {
//     return (
//       <div className="text-center py-4">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
//       </div>
//     );
//   }

//   if (tasks.length === 0) {
//     return (
//       <div className="text-center py-8">
//         <p className="text-gray-400">No tasks yet. Add one above!</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {tasks.map((task) => (
//         <TaskItem
//           key={task.id}
//           task={task}
//           onToggle={onToggleTask}
//           onDelete={onDeleteTask}
//         />
//       ))}
//     </div>
//   );
// }

// filepath: c:\Users\sathe\Projects\To-do-List\src\frontend\components\TaskList.tsx
import React from 'react';
import type { Task } from '../../types';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onToggleTask: (id: string, is_complete: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>; // Add this line
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