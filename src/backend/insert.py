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

    # SQL command to insert values into the tasks table
    sql_command = """
    INSERT INTO tasks (title, description, is_complete)
    VALUES 
        ('Task 1', 'Description for Task 1', false),
        ('Task 2', 'Description for Task 2', true),
        ('Task 3', 'Description for Task 3', false);
    """
    # Execute the SQL command
    cursor.execute(sql_command)
    connection.commit()
    print("Values inserted successfully!")

except Exception as e:
    print(f"An error occurred: {e}")

finally:
    # Close the database connection
    if connection:
        cursor.close()
        connection.close()
        print("Database connection closed.")