
import { Customer, NewCustomerData } from '@/types/customer';

class MockCustomerService {
  private customers: Map<string, Customer> = new Map();
  private customerIdCounter = 1000;

  constructor() {
    // Initialize with sample customers
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleCustomers: Customer[] = [
      {
        id: '3868-QPYBK',
        gender: 'Female',
        age: 45,
        tenure: 12,
        monthlyCharges: 75.50,
        totalCharges: 906.00,
        contract: 'Month-to-month',
        paymentMethod: 'Electronic check',
        supportTickets: 3,
        usageFrequency: 2,
        churnProbability: 78
      },
      {
        id: '4472-LVYGI',
        gender: 'Male',
        age: 32,
        tenure: 24,
        monthlyCharges: 45.20,
        totalCharges: 1084.80,
        contract: 'One year',
        paymentMethod: 'Credit card',
        supportTickets: 1,
        usageFrequency: 5,
        churnProbability: 34
      },
      {
        id: '7795-CFOCW',
        gender: 'Female',
        age: 28,
        tenure: 6,
        monthlyCharges: 89.90,
        totalCharges: 539.40,
        contract: 'Month-to-month',
        paymentMethod: 'Electronic check',
        supportTickets: 5,
        usageFrequency: 1,
        churnProbability: 85
      },
      {
        id: '1066-JKSGK',
        gender: 'Male',
        age: 55,
        tenure: 36,
        monthlyCharges: 25.50,
        totalCharges: 918.00,
        contract: 'Two year',
        paymentMethod: 'Bank transfer',
        supportTickets: 0,
        usageFrequency: 7,
        churnProbability: 15
      },
      {
        id: '2178-PQRST',
        gender: 'Female',
        age: 41,
        tenure: 18,
        monthlyCharges: 65.75,
        totalCharges: 1183.50,
        contract: 'One year',
        paymentMethod: 'Mailed check',
        supportTickets: 2,
        usageFrequency: 4,
        churnProbability: 42
      }
    ];

    sampleCustomers.forEach(customer => {
      this.customers.set(customer.id, customer);
    });
  }

  private generateCustomerId(): string {
    this.customerIdCounter++;
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetters = Array.from({ length: 5 }, () => 
      letters.charAt(Math.floor(Math.random() * letters.length))
    ).join('');
    return `${this.customerIdCounter}-${randomLetters}`;
  }

  private calculateChurnProbability(customer: NewCustomerData): number {
    let score = 0;

    // Contract type impact
    if (customer.contract === 'Month-to-month') score += 30;
    else if (customer.contract === 'One year') score += 15;
    else score += 5;

    // Payment method impact
    if (customer.paymentMethod === 'Electronic check') score += 25;
    else if (customer.paymentMethod === 'Mailed check') score += 20;
    else score += 10;

    // Support tickets impact
    score += Math.min(customer.supportTickets * 8, 25);

    // Usage frequency impact (inverse relationship)
    if (customer.usageFrequency < 3) score += 20;
    else if (customer.usageFrequency < 6) score += 10;
    else score += 0;

    // Tenure impact (inverse relationship)
    if (customer.tenure < 12) score += 15;
    else if (customer.tenure < 24) score += 8;
    else score += 0;

    // Monthly charges impact
    if (customer.monthlyCharges > 80) score += 10;
    else if (customer.monthlyCharges > 50) score += 5;

    return Math.min(Math.max(score, 5), 95);
  }

  async getCustomer(customerId: string): Promise<Customer | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.customers.get(customerId) || null;
  }

  async addCustomer(customerData: NewCustomerData): Promise<Customer> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const newCustomer: Customer = {
      id: this.generateCustomerId(),
      ...customerData,
      churnProbability: this.calculateChurnProbability(customerData)
    };

    this.customers.set(newCustomer.id, newCustomer);
    return newCustomer;
  }

  async deleteCustomer(customerId: string): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.customers.delete(customerId);
  }

  getSampleCustomers(): { id: string; churnProbability: number }[] {
    const customerArray = Array.from(this.customers.values());
    return customerArray.slice(0, 10).map(customer => ({
      id: customer.id,
      churnProbability: customer.churnProbability
    }));
  }

  getTotalCustomers(): number {
    // Simulate large dataset
    return 64247;
  }

  getAverageChurnRate(): number {
    const customers = Array.from(this.customers.values());
    if (customers.length === 0) return 0;
    
    const averageChurn = customers.reduce((sum, customer) => sum + customer.churnProbability, 0) / customers.length;
    return Math.round(averageChurn * 10) / 10;
  }
}

export const mockCustomerService = new MockCustomerService();
