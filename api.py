from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
import sqlite3
from contextlib import contextmanager
import os
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

DATABASE = 'customer_churn.db'

def init_db():
    try:
        with sqlite3.connect(DATABASE) as conn:
            cursor = conn.cursor()
            
            # First create table if it doesn't exist
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS customers (
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
                    Churn INTEGER
                )
            """)
            
            # Check if PaymentMethod column exists
            cursor.execute("PRAGMA table_info(customers)")
            columns = [column[1] for column in cursor.fetchall()]
            
            # Add PaymentMethod column if it doesn't exist
            if 'PaymentMethod' not in columns:
                cursor.execute("""
                    ALTER TABLE customers
                    ADD COLUMN PaymentMethod TEXT DEFAULT 'Electronic check'
                """)
                logger.info("Added PaymentMethod column to existing table")
            
            conn.commit()
            logger.info("Database initialized successfully")
    except Exception as e:
        logger.error(f"Error initializing database: {str(e)}")
        raise

# Initialize database on startup
init_db()

@contextmanager
def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()

def dict_factory(cursor, row):
    fields = [column[0] for column in cursor.description]
    return {key: value for key, value in zip(fields, row)}

def preprocess_customer(data):
    data = data.copy()
    # Convert gender to numeric
    if 'Gender' in data:
        data['Gender'] = 1 if str(data['Gender']).lower() == 'female' else 0
    
    # Convert subscription type to numeric
    if 'Subscription Type' in data:
        subscription_map = {'Basic': 0, 'Standard': 1, 'Premium': 2}
        data['Subscription Type'] = subscription_map.get(str(data['Subscription Type']), 0)
    
    # Convert contract length to numeric
    if 'Contract Length' in data:
        contract_map = {'Monthly': 0, 'Quarterly': 1, 'Annual': 2}
        data['Contract Length'] = contract_map.get(str(data['Contract Length']), 0)
    
    return data

def predict_churn(customer_data):
    probability = 0
    factors = {}
    
    # Usage Frequency Impact
    if customer_data['Usage Frequency'] < 5:
        probability += 15
        factors['Usage Frequency Impact'] = 50
    elif customer_data['Usage Frequency'] < 10:
        probability += 10
        factors['Usage Frequency Impact'] = 30
    
    # Contract Type Risk
    if customer_data['Contract Length'] == 'Monthly':
        probability += 20
        factors['Contract Type Risk'] = 40
    elif customer_data['Contract Length'] == 'Quarterly':
        probability += 10
        factors['Contract Type Risk'] = 25
    
    # Payment Method Risk
    if customer_data['Payment Delay'] > 0:
        probability += 15
        factors['Payment Method Risk'] = 30
    
    # Tenure Risk
    if customer_data['Tenure'] < 6:
        probability += 15
        factors['Tenure Risk'] = 25
    elif customer_data['Tenure'] < 12:
        probability += 10
        factors['Tenure Risk'] = 15
    
    # Financial Impact
    monthly_spend = customer_data['Total Spend'] / max(customer_data['Tenure'], 1)
    if monthly_spend > 100:
        probability += 10
        factors['Financial Impact'] = 25
    
    # Support Ticket Volume
    if customer_data['Support Calls'] > 3:
        probability += 20
        factors['Support Ticket Volume'] = 15
        factors['High Support Calls'] = 20
    elif customer_data['Support Calls'] > 1:
        probability += 10
        factors['Support Ticket Volume'] = 10
    
    # Last Interaction Impact
    if customer_data['Last Interaction'] > 30:
        probability += 25
        factors['Recent Inactivity'] = 25
    
    # Usage Level Impact
    if customer_data['Usage Frequency'] < 3:
        factors['Low Usage'] = 15
    
    # Contract Type Additional Impact
    if customer_data['Contract Length'] == 'Monthly':
        factors['Short Contract'] = 10
    
    # New Customer Risk
    if customer_data['Tenure'] < 3:
        factors['New Customer'] = 15
    
    probability = min(probability, 100)
    
    # Normalize factors to percentages
    total = sum(factors.values())
    if total > 0:
        factors = {k: round((v / total) * 100, 2) for k, v in factors.items()}
    
    # Sort factors by impact
    factors = dict(sorted(factors.items(), key=lambda x: x[1], reverse=True))
    
    # Generate strategy recommendations
    strategies = {
        'retention_focus': (
            "High-risk customer requires immediate intervention"
            if probability > 70 else
            "Moderate risk - implement preventive measures"
            if probability > 40 else
            "Low risk - maintain current engagement level"
        ),
        'engagement_strategy': "Increase touchpoints and personalized communication based on usage patterns",
        'pricing_optimization': (
            "Consider offering loyalty discounts or value-added services"
            if monthly_spend > 70 else
            "Opportunity for service upgrades and cross-selling"
        ),
        'service_enhancement': (
            "Focus on improving areas with low satisfaction scores"
            if customer_data['Support Calls'] > 2 else
            "Maintain current service quality"
        )
    }
    
    return probability, factors, strategies

@app.route('/api/customer/suggestions', methods=['GET'])
def get_customer_suggestions():
    query = request.args.get('query', '')
    if not query:
        return jsonify([])
    
    try:
        # Try to convert query to float for exact match
        query_float = float(query)
        search_pattern = str(query_float)
    except ValueError:
        # If not a number, use as-is
        search_pattern = query
    
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.row_factory = dict_factory
        cursor.execute("""
            SELECT CustomerID, Age, Gender, Tenure, "Usage Frequency", 
                   "Support Calls", "Payment Delay", "Subscription Type",
                   "Contract Length", "Total Spend", "Last Interaction", Churn
            FROM customers 
            WHERE CAST(CustomerID AS TEXT) LIKE ? || '%'
            LIMIT 10
        """, (search_pattern,))
        customers = cursor.fetchall()
        
        suggestions = []
        for customer in customers:
            risk, _, _ = predict_churn(customer)
            suggestions.append({
                'id': str(float(customer['CustomerID'])),
                'risk': risk
            })
        return jsonify(suggestions)

@app.route('/api/customer/<customer_id>', methods=['GET'])
def get_customer(customer_id):
    try:
        # Convert customer_id to float for comparison
        customer_id_float = float(customer_id)
        
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.row_factory = dict_factory
            cursor.execute("""
                SELECT CustomerID, Age, Gender, Tenure, "Usage Frequency", 
                       "Support Calls", "Payment Delay", "Subscription Type",
                       "Contract Length", "Total Spend", "Last Interaction", Churn,
                       PaymentMethod
                FROM customers 
                WHERE CAST(CustomerID AS FLOAT) = ?
            """, (customer_id_float,))
            customer = cursor.fetchone()
            
            if not customer:
                return jsonify({'error': 'Customer not found'}), 404
            
            processed_data = preprocess_customer(customer)
            churn_probability, churn_factors, churn_strategies = predict_churn(processed_data)
            
            customer['churn_probability'] = churn_probability
            customer['churn_factors'] = churn_factors
            customer['churn_strategies'] = churn_strategies
            return jsonify(customer)
    except ValueError:
        return jsonify({'error': 'Invalid customer ID format'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/customers', methods=['POST'])
def add_customer():
    try:
        logger.info("Received add customer request")
        new_customer = request.json
        logger.debug(f"Customer data received: {new_customer}")
        
        if not new_customer:
            logger.error("No customer data provided")
            return jsonify({'error': 'No customer data provided'}), 400

        # Simplified customer data validation
        required_fields = ['Age', 'Gender']
        for field in required_fields:
            if field not in new_customer:
                logger.error(f"Missing required field: {field}")
                return jsonify({'error': f'Missing required field: {field}'}), 400

        with sqlite3.connect(DATABASE) as conn:
            cursor = conn.cursor()
            
            # Find first available ID
            cursor.execute("""
                WITH RECURSIVE numbers(n) AS (
                    SELECT 1
                    UNION ALL
                    SELECT n + 1 FROM numbers WHERE n < (SELECT MAX(CAST(CustomerID AS INTEGER)) FROM customers)
                )
                SELECT n FROM numbers
                WHERE n NOT IN (SELECT CAST(CustomerID AS INTEGER) FROM customers)
                LIMIT 1
            """)
            result = cursor.fetchone()
            next_id = str(result[0] if result else 1)
            
            # If no gaps found, use max + 1
            if not result:
                cursor.execute("SELECT MAX(CAST(CustomerID AS INTEGER)) FROM customers")
                result = cursor.fetchone()
                next_id = str(1 if result[0] is None else result[0] + 1)
            
            # Prepare customer data with defaults
            customer_data = {
                'CustomerID': next_id,
                'Age': int(new_customer.get('Age', 0)),
                'Gender': new_customer.get('Gender', 'Male'),
                'Tenure': int(new_customer.get('Tenure', 1)),
                'Usage Frequency': int(new_customer.get('Usage Frequency', 1)),
                'Support Calls': int(new_customer.get('Support Calls', 0)),
                'Payment Delay': 0,
                'Subscription Type': new_customer.get('Subscription Type', 'Basic'),
                'Contract Length': new_customer.get('Contract Length', 'Monthly'),
                'Total Spend': float(new_customer.get('Total Spend', 0)),
                'Last Interaction': 0,
                'Churn': 0,
                'PaymentMethod': new_customer.get('PaymentMethod', 'Electronic check')
            }
            
            # Insert new customer
            cursor.execute("""
                INSERT INTO customers (
                    CustomerID, Age, Gender, Tenure, "Usage Frequency",
                    "Support Calls", "Payment Delay", "Subscription Type",
                    "Contract Length", "Total Spend", "Last Interaction",
                    Churn, PaymentMethod
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                customer_data['CustomerID'], customer_data['Age'],
                customer_data['Gender'], customer_data['Tenure'],
                customer_data['Usage Frequency'], customer_data['Support Calls'],
                customer_data['Payment Delay'], customer_data['Subscription Type'],
                customer_data['Contract Length'], customer_data['Total Spend'],
                customer_data['Last Interaction'], customer_data['Churn'],
                customer_data['PaymentMethod']
            ))
            conn.commit()
            logger.info(f"Customer added successfully with ID: {next_id}")
            return jsonify({'message': 'Customer added successfully', 'CustomerID': next_id})
            
    except sqlite3.Error as e:
        logger.error(f"Database error: {str(e)}")
        return jsonify({'error': f'Database error: {str(e)}'}), 500
    except Exception as e:
        logger.error(f"Server error: {str(e)}")
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.route('/api/customer/<customer_id>', methods=['DELETE'])
def delete_customer(customer_id):
    with get_db_connection() as conn:
        cursor = conn.cursor()
        
        # Check if customer exists
        cursor.execute("SELECT CustomerID FROM customers WHERE CustomerID = ?", (customer_id,))
        if not cursor.fetchone():
            return jsonify({'error': 'Customer not found'}), 404
        
        # Delete the customer
        cursor.execute("DELETE FROM customers WHERE CustomerID = ?", (customer_id,))
        conn.commit()
        
        return jsonify({'message': 'Customer deleted successfully'})

@app.route('/api/customers/count', methods=['GET'])
def get_customer_count():
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM customers")
        count = cursor.fetchone()[0]
        return jsonify({'count': count})

if __name__ == '__main__':
    app.run(debug=True, port=5000)