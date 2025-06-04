
export interface Customer {
  id: string;
  gender: string;
  age: number;
  tenure: number;
  monthlyCharges: number;
  totalCharges: number;
  contract: string;
  paymentMethod: string;
  supportTickets: number;
  usageFrequency: number;
  churnProbability: number;
}

export interface NewCustomerData {
  gender: string;
  age: number;
  tenure: number;
  monthlyCharges: number;
  totalCharges: number;
  contract: string;
  paymentMethod: string;
  supportTickets: number;
  usageFrequency: number;
}
