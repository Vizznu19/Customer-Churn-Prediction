import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ChurnFactorsProps {
  factors: { [key: string]: number };
}

const ChurnFactors: React.FC<ChurnFactorsProps> = ({ factors }) => {
  const factorDescriptions: { [key: string]: string } = {
    'Usage Frequency Impact': 'Level of service engagement',
    'Contract Type Risk': 'Risk based on contract commitment length',
    'Subscription Type Impact': 'Impact based on subscription tier (Basic/Standard/Premium)',
    'Payment Delay Risk': 'Risk based on payment delay history',
    'Last Interaction Risk': 'Risk based on days since last service interaction',
    'Tenure Risk': 'Risk based on customer relationship length',
    'Financial Impact': 'Impact of pricing and charges',
    'Support Ticket Volume': 'Impact of support ticket frequency',
    'High Support Calls': 'Risk from high support interaction',
    'Recent Inactivity': 'Risk from decreased service usage',
    'Low Usage': 'Risk from low service engagement',
    'Short Contract': 'Risk from shorter contract duration',
    'New Customer': 'Higher risk during initial service period'
  };

  const sortedFactors = Object.entries(factors)
    .sort(([, a], [, b]) => b - a)
    .map(([factor, value]) => ({
      name: factor,
      value: Math.round(value),
      description: factorDescriptions[factor] || 'Contributing factor to churn risk'
    }));

  const getColorForValue = (value: number) => {
    if (value >= 75) return 'bg-red-500';
    if (value >= 50) return 'bg-orange-500';
    if (value >= 25) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      {sortedFactors.map((factor) => (
        <div key={factor.name} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-900">{factor.name}</span>
            <span className="text-sm font-semibold text-gray-700">{factor.value}%</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full ${getColorForValue(factor.value)} transition-all duration-300`}
              style={{ width: `${factor.value}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-1">{factor.description}</p>
        </div>
      ))}
      {sortedFactors.length === 0 && (
        <p className="text-gray-500 text-center">No significant churn factors identified.</p>
      )}
    </div>
  );
};

export default ChurnFactors;
