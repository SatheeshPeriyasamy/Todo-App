// // // import express from 'express';
// // // import pkg from 'pg'; // Import the `pg` package as a default import
// // // const { Pool } = pkg; // Destructure `Pool` from the imported package

// // // // PostgreSQL connection pool
// // // const pool = new Pool({
// // //   host: process.env.PG_HOST,
// // //   port: parseInt(process.env.PG_PORT || '5432', 10),
// // //   database: process.env.PG_DATABASE,
// // //   user: process.env.PG_USER,
// // //   password: process.env.PG_PASSWORD,
// // // });

// // // // Helper function to query the database
// // // const query = (text, params) => pool.query(text, params);

// // // const app = express();
// // // app.use(express.json());

// // // // Fetch all tasks
// // // app.get('/api/tasks', async (req, res) => {
// // //   try {
// // //     const { rows } = await query('SELECT * FROM tasks ORDER BY created_at DESC');
// // //     res.json(rows);
// // //   } catch (error) {
// // //     console.error('Error fetching tasks:', error);
// // //     res.status(500).json({ error: 'Failed to fetch tasks' });
// // //   }
// // // });

// // // // Create a new task
// // // app.post('/api/tasks', async (req, res) => {
// // //   const { title, description } = req.body;
// // //   try {
// // //     await query('INSERT INTO tasks (title, description) VALUES ($1, $2)', [title, description]);
// // //     res.status(201).json({ message: 'Task created' });
// // //   } catch (error) {
// // //     console.error('Error creating task:', error);
// // //     res.status(500).json({ error: 'Failed to create task' });
// // //   }
// // // });

// // // // Update task status
// // // app.put('/api/tasks/:id', async (req, res) => {
// // //   const { id } = req.params;
// // //   const { is_complete } = req.body;
// // //   try {
// // //     await query('UPDATE tasks SET is_complete = $1 WHERE id = $2', [is_complete, id]);
// // //     res.json({ message: 'Task updated' });
// // //   } catch (error) {
// // //     console.error('Error updating task:', error);
// // //     res.status(500).json({ error: 'Failed to update task' });
// // //   }
// // // });

// // // // Delete a task
// // // app.delete('/api/tasks/:id', async (req, res) => {
// // //   const { id } = req.params;
// // //   try {
// // //     await query('DELETE FROM tasks WHERE id = $1', [id]);
// // //     res.json({ message: 'Task deleted' });
// // //   } catch (error) {
// // //     console.error('Error deleting task:', error);
// // //     res.status(500).json({ error: 'Failed to delete task' });
// // //   }
// // // });

// // // // Start the server
// // // const PORT = process.env.PORT || 3000;
// // // app.listen(PORT, () => {
// // //   console.log(`Backend running on http://localhost:${PORT}`);
// // // });

// // import pkg from 'pg'; // Import the `pg` package as a default import

// // const { Pool } = pkg; // Destructure `Pool` from the imported package

// // // PostgreSQL connection pool with hardcoded credentials
// // const pool = new Pool({
// //   host: 'tododb1.c7qecy2oovq9.ap-south-1.rds.amazonaws.com',
// //   port: 5432,
// //   database: 'postgres',
// //   user: 'admin123',
// //   password: 'admin123',
// // });

// // (async () => {
// //   try {
// //     const client = await pool.connect();
// //     console.log('Connected to the database successfully!');
// //     client.release();
// //   } catch (error) {
// //     console.error('Database connection error:', error);
// //   }
// // })();


// import pkg from 'pg';
// import express from 'express';

// const { Pool } = pkg;

// const pool = new Pool({
//   host: 'tododb1.c7qecy2oovq9.ap-south-1.rds.amazonaws.com',
//   port: 5432,
//   database: 'postgres',
//   user: 'admin123',
//   password: 'admin123',
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// const app = express();
// app.use(express.json());

// // Fetch all tasks
// app.get('/api/tasks', async (req, res) => {
//   try {
//     const client = await pool.connect();
//     const result = await client.query('SELECT * FROM tasks');
//     res.json(result.rows);
//     client.release();
//   } catch (error) {
//     console.error('Error fetching tasks:', error);
//     res.status(500).json({ error: 'Failed to fetch tasks' });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Backend running on http://localhost:${PORT}`);
// });


import pkg from 'pg';
import express from 'express';

const { Pool } = pkg;

const pool = new Pool({
  host: 'tododb1.c7qecy2oovq9.ap-south-1.rds.amazonaws.com',
  port: 5432,
  database: 'postgres',
  user: 'admin123',
  password: 'admin123',
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();
app.use(express.json());

// Fetch all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(result.rows);
    client.release();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Create a new task
app.post('/api/tasks', async (req, res) => {
  const { title, description } = req.body;
  try {
    const client = await pool.connect();
    await client.query('INSERT INTO tasks (title, description) VALUES ($1, $2)', [title, description]);
    res.status(201).json({ message: 'Task created' });
    client.release();
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
    const client = await pool.connect();
    await client.query('UPDATE tasks SET is_complete = $1 WHERE id = $2', [is_complete, id]);
    res.json({ message: 'Task updated' });
    client.release();
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();
    await client.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.json({ message: 'Task deleted' });
    client.release();
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