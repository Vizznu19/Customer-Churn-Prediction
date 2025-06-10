
import { Customer, NewCustomerData } from '../types/customer';

class CustomerService {
  private baseUrl = 'http://localhost:5000/api';

  async getCustomer(customerId: string): Promise<Customer | null> {
    try {
      // Convert to float for consistent formatting
      const formattedId = parseFloat(customerId).toString();
      const response = await fetch(`${this.baseUrl}/customer/${formattedId}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error('Failed to fetch customer');
      }
      const data = await response.json();
      return {
        id: data.CustomerID.toString(),
        gender: data.Gender,
        age: data.Age,
        tenure: data.Tenure,
        monthlyCharges: data['Total Spend'] / data.Tenure || 0,
        totalCharges: data['Total Spend'],
        contract: data['Contract Length'],
        subscriptionType: data['Subscription Type'] || 'Basic',
        paymentMethod: data['Payment Method'] || 'Credit Card',
        paymentDelay: data['Payment Delay'] || 0,
        lastInteraction: data['Last Interaction'] || 0,
        supportTickets: data['Support Calls'],
        usageFrequency: data['Usage Frequency'],
        churnProbability: data.churn_probability,
        churnFactors: data.churn_factors || {},
        churnStrategies: {
          retention_focus: data.churn_strategies?.retention_focus || '',
          engagement_strategy: data.churn_strategies?.engagement_strategy || '',
          pricing_optimization: data.churn_strategies?.pricing_optimization || '',
          service_enhancement: data.churn_strategies?.service_enhancement || ''
        }
      };
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw error;
    }
  }

  async getSuggestions(query: string): Promise<{ id: string; risk: number }[]> {
    try {
      // Try to format as float if it's a number
      const formattedQuery = isNaN(parseFloat(query)) ? query : parseFloat(query).toString();
      const response = await fetch(`${this.baseUrl}/customer/suggestions?query=${formattedQuery}`);
      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      return [];
    }
  }

  async getAllCustomers(): Promise<number> {
    try {
      const response = await fetch(`${this.baseUrl}/customers/count`);
      if (!response.ok) {
        throw new Error('Failed to fetch customer count');
      }
      const data = await response.json();
      return data.count;
    } catch (error) {
      console.error('Error fetching customer count:', error);
      return 0;
    }
  }

  async addCustomer(customerData: NewCustomerData): Promise<Customer> {
    try {
      const response = await fetch(`${this.baseUrl}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Age: customerData.age,
          Gender: customerData.gender,
          Tenure: customerData.tenure,
          'Usage Frequency': customerData.usageFrequency || 1,
          'Support Calls': customerData.supportTickets || 0,
          'Total Spend': customerData.monthlyCharges * customerData.tenure,
          'Contract Length': customerData.contract || 'Monthly',
          'Subscription Type': customerData.subscriptionType || 'Basic',
          'Payment Method': customerData.paymentMethod || 'Credit Card',
          'Payment Delay': customerData.paymentDelay || 0,
          'Last Interaction': customerData.lastInteraction || 0
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add customer');
      }

      // Wait a bit for the database to be updated
      await new Promise(resolve => setTimeout(resolve, 500));

      const newCustomer = await this.getCustomer(data.CustomerID);
      if (!newCustomer) {
        throw new Error('Failed to retrieve newly added customer');
      }
      return newCustomer;
    } catch (error) {
      console.error('Error adding customer:', error);
      throw error;
    }
  }

  async deleteCustomer(customerId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/customer/${customerId}`, {
        method: 'DELETE',
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting customer:', error);
      return false;
    }
  }
}

const customerService = new CustomerService();
export default customerService;
