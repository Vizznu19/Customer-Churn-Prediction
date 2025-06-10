

export interface Customer {
  id: string;
  gender: string;
  age: number;
  tenure: number;
  monthlyCharges: number;
  totalCharges: number;
  contract: string;
  subscriptionType: string;
  paymentMethod: string;
  paymentDelay: number;
  lastInteraction: number;
  supportTickets: number;
  usageFrequency: number;
  churnProbability: number;
  churnFactors: { [key: string]: number };
  churnStrategies: {
    retention_focus: string;
    engagement_strategy: string;
    pricing_optimization: string;
    service_enhancement: string;
  };
}

export interface NewCustomerData {
  gender: string;
  age: number;
  tenure: number;
  monthlyCharges: number;
  contract: string;
  subscriptionType: string;
  paymentMethod: string;
  paymentDelay: number;
  lastInteraction: number;
  supportTickets: number;
  usageFrequency: number;
}

export type ContractType = 'Monthly' | 'Quarterly' | 'Annual';
export type SubscriptionType = 'Basic' | 'Standard' | 'Premium';
export type Gender = 'Male' | 'Female';
export type PaymentMethod = 'Credit Card' | 'Bank Transfer' | 'Electronic Check' | 'Mailed Check';
