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
        id: '3868',
        gender: 'Female',
        age: 45,
        tenure: 12,
        monthlyCharges: 75.50,
        totalCharges: 906.00,
        contract: 'Month-to-month',
        paymentMethod: 'Electronic check',
        supportTickets: 3,
        usageFrequency: 2,
        churnProbability: 78,
        churnFactors: {
          'Usage Frequency Impact': 65,
          'Contract Type Risk': 80,
          'Payment Method Risk': 70
        },
        churnStrategies: {
          retention_focus: 'High risk - immediate intervention needed',
          engagement_strategy: 'Increase engagement through personalized offers',
          pricing_optimization: 'Consider loyalty discounts',
          service_enhancement: 'Improve service reliability'
        }
      },
      {
        id: '4472',
        gender: 'Male',
        age: 32,
        tenure: 24,
        monthlyCharges: 45.20,
        totalCharges: 1084.80,
        contract: 'One year',
        paymentMethod: 'Credit card',
        supportTickets: 1,
        usageFrequency: 5,
        churnProbability: 34,
        churnFactors: {
          'Usage Frequency Impact': 20,
          'Contract Type Risk': 30,
          'Payment Method Risk': 40
        },
        churnStrategies: {
          retention_focus: 'Low risk - maintain engagement',
          engagement_strategy: 'Regular check-ins and feedback',
          pricing_optimization: 'Opportunity for upselling',
          service_enhancement: 'Proactive service improvements'
        }
      },
      {
        id: '7795',
        gender: 'Female',
        age: 28,
        tenure: 6,
        monthlyCharges: 89.90,
        totalCharges: 539.40,
        contract: 'Month-to-month',
        paymentMethod: 'Electronic check',
        supportTickets: 5,
        usageFrequency: 1,
        churnProbability: 85,
        churnFactors: {
          'Usage Frequency Impact': 80,
          'Contract Type Risk': 80,
          'Payment Method Risk': 70
        },
        churnStrategies: {
          retention_focus: 'High risk - immediate intervention needed',
          engagement_strategy: 'Urgent engagement plan needed',
          pricing_optimization: 'Consider significant discount',
          service_enhancement: 'Address service issues immediately'
        }
      },
      {
        id: '1066',
        gender: 'Male',
        age: 55,
        tenure: 36,
        monthlyCharges: 25.50,
        totalCharges: 918.00,
        contract: 'Two year',
        paymentMethod: 'Bank transfer',
        supportTickets: 0,
        usageFrequency: 7,
        churnProbability: 15,
        churnFactors: {
          'Usage Frequency Impact': 10,
          'Contract Type Risk': 20,
          'Payment Method Risk': 30
        },
        churnStrategies: {
          retention_focus: 'Low risk - maintain satisfaction',
          engagement_strategy: 'Continue current engagement',
          pricing_optimization: 'Consider premium services',
          service_enhancement: 'Maintain service quality'
        }
      },
      {
        id: '2178',
        gender: 'Female',
        age: 41,
        tenure: 18,
        monthlyCharges: 65.75,
        totalCharges: 1183.50,
        contract: 'One year',
        paymentMethod: 'Mailed check',
        supportTickets: 2,
        usageFrequency: 4,
        churnProbability: 42,
        churnFactors: {
          'Usage Frequency Impact': 40,
          'Contract Type Risk': 30,
          'Payment Method Risk': 50
        },
        churnStrategies: {
          retention_focus: 'Moderate risk - monitor closely',
          engagement_strategy: 'Increase engagement touchpoints',
          pricing_optimization: 'Review current plan',
          service_enhancement: 'Regular service reviews'
        }
      }
    ];

    sampleCustomers.forEach(customer => {
      this.customers.set(customer.id, customer);
    });
  }

  private generateCustomerId(): string {
    this.customerIdCounter++;
    return this.customerIdCounter.toString();
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
      totalCharges: customerData.monthlyCharges * customerData.tenure,
      churnProbability: this.calculateChurnProbability(customerData),
      churnFactors: this.calculateChurnFactors(customerData),
      churnStrategies: this.generateChurnStrategies(customerData)
    };

    this.customers.set(newCustomer.id, newCustomer);
    return newCustomer;
  }

  private calculateChurnFactors(customerData: NewCustomerData): { [key: string]: number } {
    return {
      'Usage Frequency Impact': Math.min(100, Math.max(0, (5 - customerData.usageFrequency) * 20)),
      'Contract Type Risk': customerData.contract === 'Month-to-month' ? 80 : 30,
      'Payment Method Risk': customerData.paymentMethod === 'Electronic check' ? 70 : 40
    };
  }

  private generateChurnStrategies(customerData: NewCustomerData): Customer['churnStrategies'] {
    const churnRisk = this.calculateChurnProbability(customerData);
    return {
      retention_focus: churnRisk > 70 ? 'High risk - immediate intervention needed' : 'Moderate risk - monitor closely',
      engagement_strategy: 'Increase engagement through personalized offers',
      pricing_optimization: customerData.monthlyCharges > 70 ? 'Consider loyalty discounts' : 'Opportunity for upselling',
      service_enhancement: 'Improve service based on usage patterns'
    };
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
