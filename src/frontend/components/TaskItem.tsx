// import React from 'react';
// import { CheckCircle, XCircle, Trash2 } from 'lucide-react';
// import { Task } from '../../types';

// interface TaskItemProps {
//   task: Task;
//   onToggle: (id: string, is_complete: boolean) => Promise<void>;
//   onDelete: (id: string) => Promise<void>;
// }

// export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
//   return (
//     <div className="bg-gray-800 rounded-lg p-4 flex items-start justify-between gap-4 transition-all duration-200 hover:bg-gray-750">
//       <div className="flex-1">
//         <h3 className={`text-lg font-medium ${task.is_complete ? 'text-gray-400 line-through' : 'text-gray-100'}`}>
//           {task.title}
//         </h3>
//         {task.description && (
//           <p className={`mt-1 text-sm ${task.is_complete ? 'text-gray-500' : 'text-gray-400'}`}>
//             {task.description}
//           </p>
//         )}
//       </div>
//       <div className="flex items-center space-x-2">
//         <button
//           onClick={() => onToggle(task.id, task.is_complete)}
//           className={`p-1 rounded-full transition-colors duration-200 ${
//             task.is_complete
//               ? 'text-green-500 hover:text-green-400'
//               : 'text-gray-400 hover:text-gray-300'
//           }`}
//         >
//           {task.is_complete ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
//         </button>
//         <button
//           onClick={() => onDelete(task.id)}
//           className="p-1 rounded-full text-red-500 hover:text-red-400 transition-colors duration-200"
//         >
//           <Trash2 className="w-6 h-6" />
//         </button>
//       </div>
//     </div>
//   );
// }


import React from 'react';
import { CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { Task } from '../../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, is_complete: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 flex items-start justify-between gap-4 transition-all duration-200 hover:bg-gray-750 shadow-md">
      <div className="flex-1">
        <h3
          className={`text-lg font-medium ${
            task.is_complete ? 'text-gray-400 line-through' : 'text-gray-100'
          }`}
        >
          {task.title}
        </h3>
        {task.description && (
          <p
            className={`mt-1 text-sm ${
              task.is_complete ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            {task.description}
          </p>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {/* Toggle Complete/Incomplete */}
        <button
          onClick={() => onToggle(task.id, task.is_complete)}
          className={`p-1 rounded-full transition-colors duration-200 ${
            task.is_complete
              ? 'text-green-500 hover:text-green-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          title={task.is_complete ? 'Mark Incomplete' : 'Mark Complete'}
        >
          {task.is_complete ? (
            <CheckCircle className="w-6 h-6" />
          ) : (
            <XCircle className="w-6 h-6" />
          )}
        </button>
        {/* Delete Task */}
        <button
          onClick={() => onDelete(task.id)}
          className="p-1 rounded-full text-red-500 hover:text-red-400 transition-colors duration-200"
          title="Delete Task"
        >
          <Trash2 className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}