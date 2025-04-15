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

    # SQL command to fetch all rows from the tasks table
    sql_command = "SELECT * FROM tasks;"
    
    # Execute the SQL command
    cursor.execute(sql_command)
    
    # Fetch all rows from the result
    rows = cursor.fetchall()
    
    # Print the fetched rows
    print("Inserted values in the tasks table:")
    for row in rows:
        print(row)

except Exception as e:
    print(f"An error occurred: {e}")

finally:
    # Close the database connection
    if connection:
        cursor.close()
        connection.close()
        print("Database connection closed.")