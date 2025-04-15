import React, { useState, useEffect } from 'react';
import { TaskItem } from './frontend/components/TaskItem';
import { TaskForm } from './frontend/components/TaskForm';
import { Task } from './types';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);



// const API_BASE_URL = 'http://todobackendexpressapi-env.eba-ess5haam.ap-south-1.elasticbeanstalk.com';
const API_BASE_URL = 'https://todobackend-fwz8.onrender.com';

async function loadTasks() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks`);
    const data = await response.json();
    setTasks(data);
  } catch (error) {
    console.error('Error loading tasks:', error);
  } finally {
    setLoading(false);
  }
}

async function handleCreateTask(title: string, description: string) {
  try {
    await fetch(`${API_BASE_URL}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    loadTasks();
  } catch (error) {
    console.error('Error creating task:', error);
  }
}

async function handleToggleTask(id: string, is_complete: boolean) {
  try {
    await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_complete: !is_complete }),
    });
    loadTasks();
  } catch (error) {
    console.error('Error updating task:', error);
  }
}

async function handleDeleteTask(id: string) {
  try {
    await fetch(`${API_BASE_URL}/api/tasks/${id}`, { 
      method: 'DELETE' 
    });
    loadTasks();
  } catch (error) {
    console.error('Error deleting task:', error);
  }
}

// ...existing code...

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-800">
          <div className="px-4 sm:px-6 py-6 sm:py-8">
            <h1 className="text-3xl font-bold text-gray-100 mb-8 text-center sm:text-left">Task Manager</h1>

            {/* Task Form */}
            <TaskForm onSubmit={handleCreateTask} />

            {/* Task List */}
            {loading ? (
              <p className="text-gray-400 text-center">Loading tasks...</p>
            ) : tasks.length === 0 ? (
              <p className="text-gray-400 text-center">No tasks available.</p>
            ) : (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={handleToggleTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;