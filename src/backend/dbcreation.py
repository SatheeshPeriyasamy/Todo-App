# Install psycopg2 if not already installed: pip install psycopg2
import psycopg2
from psycopg2 import sql

# Database connection details
host = 'tododb.cyitak0a1uke.ap-south-1.rds.amazonaws.com'
port = 5432
database = 'postgres'
user = 'Satheesh'
password = 'Satheesh123'

try:
    # Connect to the PostgreSQL database
    connection = psycopg2.connect(
        host=host,
        port=port,
        database=database,
        user=user,
        password=password
    )
    cursor = connection.cursor()
    print("Connected to the database successfully!")

    # SQL command to execute
    # sql_command = """
    # CREATE TABLE IF NOT EXISTS tasks (
    #   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    #   title text NOT NULL,
    #   description text,
    #   is_complete boolean DEFAULT false,
    #   created_at timestamptz DEFAULT now(),
    #   updated_at timestamptz DEFAULT now()
    # );

    # ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

    # CREATE POLICY "Allow public access to tasks"
    #   ON tasks
    #   FOR ALL
    #   USING (true)
    #   WITH CHECK (true);
    # """

    sql_command = """
    select * from tasks;
    """
    # Execute the SQL command
    cursor.execute(sql_command)
    connection.commit()
    print("SQL command executed successfully!")

except Exception as e:
    print(f"An error occurred: {e}")

finally:
    # Close the database connection
    if connection:
        cursor.close()
        connection.close()
        print("Database connection closed.")