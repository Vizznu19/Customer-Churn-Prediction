
import React from 'react';
import { Customer } from '@/types/customer';
import { Progress } from '@/components/ui/progress';

interface ChurnFactorsProps {
  customer: Customer;
}

const ChurnFactors = ({ customer }: ChurnFactorsProps) => {
  // Calculate contributing factors based on customer data
  const factors = [
    {
      name: 'Contract Type Risk',
      value: customer.contract === 'Month-to-month' ? 85 : customer.contract === 'One year' ? 40 : 20,
      description: customer.contract === 'Month-to-month' ? 'High risk - no long-term commitment' : 'Lower risk - committed contract'
    },
    {
      name: 'Payment Method Risk',
      value: customer.paymentMethod === 'Electronic check' ? 70 : customer.paymentMethod === 'Mailed check' ? 60 : 30,
      description: 'Electronic checks have higher churn correlation'
    },
    {
      name: 'Support Ticket Volume',
      value: Math.min(customer.supportTickets * 15, 100),
      description: customer.supportTickets > 3 ? 'High support volume indicates dissatisfaction' : 'Normal support interaction'
    },
    {
      name: 'Usage Frequency Impact',
      value: customer.usageFrequency < 3 ? 80 : customer.usageFrequency < 6 ? 50 : 25,
      description: customer.usageFrequency < 3 ? 'Low usage indicates low engagement' : 'Good engagement level'
    },
    {
      name: 'Tenure Risk',
      value: customer.tenure < 12 ? 75 : customer.tenure < 24 ? 45 : 25,
      description: customer.tenure < 12 ? 'New customers are more likely to churn' : 'Established customer relationship'
    },
    {
      name: 'Financial Impact',
      value: customer.monthlyCharges > 80 ? 65 : customer.monthlyCharges > 50 ? 40 : 25,
      description: customer.monthlyCharges > 80 ? 'High charges may drive churn' : 'Moderate pricing impact'
    }
  ].sort((a, b) => b.value - a.value);

  const getProgressColor = (value: number) => {
    if (value >= 70) return 'bg-red-500';
    if (value >= 40) return 'bg-orange-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      {factors.map((factor, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium text-gray-900">{factor.name}</h4>
            <span className="text-sm font-semibold text-gray-700">{factor.value}%</span>
          </div>
          <div className="relative">
            <Progress 
              value={factor.value} 
              className="h-3"
            />
            <div 
              className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${getProgressColor(factor.value)}`}
              style={{ width: `${factor.value}%` }}
            />
          </div>
          <p className="text-xs text-gray-600">{factor.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ChurnFactors;
