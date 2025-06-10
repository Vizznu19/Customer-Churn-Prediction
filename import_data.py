import pandas as pd
import sqlite3
import os
import numpy as np

# Configuration
CSV_FILE = '../Customer churn dataset.csv'
DATABASE = 'customer_churn.db'

def clean_value(value, default, convert_func):
    try:
        if pd.isna(value):
            return default
        return convert_func(value)
    except:
        return default

def import_data():
    print("Starting data import...")
    
    # Read CSV file
    print("Reading CSV file...")
    df = pd.read_csv(CSV_FILE)
    
    # Remove existing database if it exists
    if os.path.exists(DATABASE):
        print("Removing existing database...")
        os.remove(DATABASE)
    
    # Create new database connection
    print("Creating new database...")
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Create table with correct schema
    print("Creating customers table...")
    cursor.execute("""
        CREATE TABLE customers (
            CustomerID TEXT PRIMARY KEY,
            Age INTEGER,
            Gender TEXT,
            Tenure INTEGER,
            "Usage Frequency" INTEGER,
            "Support Calls" INTEGER,
            "Payment Delay" INTEGER,
            "Subscription Type" TEXT,
            "Contract Length" TEXT,
            "Total Spend" REAL,
            "Last Interaction" INTEGER,
            Churn INTEGER,
            PaymentMethod TEXT
        )
    """)
    
    # Prepare data for insertion
    print("Preparing data for insertion...")
    records = []
    for _, row in df.iterrows():
        try:
            record = (
                str(row['CustomerID']),
                clean_value(row['Age'], 0, int),
                clean_value(row['Gender'], 'Unknown', str),
                clean_value(row['Tenure'], 0, int),
                clean_value(row['Usage Frequency'], 0, int),
                clean_value(row['Support Calls'], 0, int),
                clean_value(row.get('Payment Delay', 0), 0, int),
                clean_value(row['Subscription Type'], 'Basic', str),
                clean_value(row['Contract Length'], 'Monthly', str),
                clean_value(row['Total Spend'], 0.0, float),
                clean_value(row.get('Last Interaction', 0), 0, int),
                clean_value(row.get('Churn', 0), 0, int),
                clean_value(row.get('PaymentMethod', 'Electronic check'), 'Electronic check', str)
            )
            records.append(record)
        except Exception as e:
            print(f"Warning: Skipping row due to error: {e}")
            continue
    
    # Insert data in batches
    print("Inserting data into database...")
    batch_size = 1000
    for i in range(0, len(records), batch_size):
        batch = records[i:i + batch_size]
        cursor.executemany("""
            INSERT INTO customers (
                CustomerID, Age, Gender, Tenure, "Usage Frequency",
                "Support Calls", "Payment Delay", "Subscription Type",
                "Contract Length", "Total Spend", "Last Interaction",
                Churn, PaymentMethod
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, batch)
        print(f"Inserted {min(i + batch_size, len(records))} of {len(records)} records...")
    
    # Commit changes and close connection
    print("Committing changes...")
    conn.commit()
    conn.close()
    
    print("Data import completed successfully!")

if __name__ == "__main__":
    import_data() 