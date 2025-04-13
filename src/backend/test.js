import pkg from 'pg';

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

(async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to the database successfully!');
    const res = await client.query('SELECT * FROM tasks');
    console.log('Query results:', res.rows);
    client.release();
  } catch (error) {
    console.error('Database connection error:', error);
  }
})();