// // import { supabase } from '../lib/supabase';
// // import { Task } from '../types';

// // export async function fetchTasks(): Promise<Task[]> {
// //   const { data, error } = await supabase
// //     .from('tasks')
// //     .select('*')
// //     .order('created_at', { ascending: false });

// //   if (error) throw error;
// //   return data || [];
// // }

// // export async function createTask(title: string, description: string): Promise<void> {
// //   const { error } = await supabase
// //     .from('tasks')
// //     .insert([{ title, description }]);

// //   if (error) throw error;
// // }

// // export async function updateTaskStatus(id: string, is_complete: boolean): Promise<void> {
// //   const { error } = await supabase
// //     .from('tasks')
// //     .update({ is_complete: !is_complete })
// //     .eq('id', id);

// //   if (error) throw error;
// // }

// // export async function deleteTask(id: string): Promise<void> {
// //   const { error } = await supabase
// //     .from('tasks')
// //     .delete()
// //     .eq('id', id);

// //   if (error) throw error;
// // }

// import { query } from '../lib/postgres';
// import { Task } from '../types';

// export async function fetchTasks(): Promise<Task[]> {
//   const { rows } = await query('SELECT * FROM tasks ORDER BY created_at DESC');
//   return rows;
// }

// export async function createTask(title: string, description: string): Promise<void> {
//   await query('INSERT INTO tasks (title, description) VALUES ($1, $2)', [title, description]);
// }

// export async function updateTaskStatus(id: string, is_complete: boolean): Promise<void> {
//   await query('UPDATE tasks SET is_complete = $1 WHERE id = $2', [!is_complete, id]);
// }

// export async function deleteTask(id: string): Promise<void> {
//   await query('DELETE FROM tasks WHERE id = $1', [id]);
// }

import express from 'express';
import { query } from '../lib/postgres';

const app = express();
app.use(express.json());

// Fetch all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Create a new task
app.post('/api/tasks', async (req, res) => {
  const { title, description } = req.body;
  try {
    await query('INSERT INTO tasks (title, description) VALUES ($1, $2)', [title, description]);
    res.status(201).json({ message: 'Task created' });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Update task status
app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { is_complete } = req.body;
  try {
    await query('UPDATE tasks SET is_complete = $1 WHERE id = $2', [is_complete, id]);
    res.json({ message: 'Task updated' });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await query('DELETE FROM tasks WHERE id = $1', [id]);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});