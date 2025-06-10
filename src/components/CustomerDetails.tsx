import React from 'react';
import { Customer } from '../types/customer';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface CustomerDetailsProps {
  customer: Customer;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
  const formatCurrency = (value: number | undefined) => {
    if (value === undefined) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatNumber = (value: number | undefined, suffix: string = '') => {
    if (value === undefined) return '0' + suffix;
    return value.toString() + suffix;
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Customer ID</p>
          <p className="text-base font-semibold text-gray-900">{customer.id || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Age</p>
          <p className="text-base font-semibold text-gray-900">{formatNumber(customer.age, ' years')}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Gender</p>
          <p className="text-base font-semibold text-gray-900">{customer.gender || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Tenure</p>
          <p className="text-base font-semibold text-gray-900">{formatNumber(customer.tenure, ' months')}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Monthly Charges</p>
          <p className="text-base font-semibold text-gray-900">{formatCurrency(customer.monthlyCharges)}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Total Charges</p>
          <p className="text-base font-semibold text-gray-900">{formatCurrency(customer.totalCharges)}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Contract Type</p>
          <p className="text-base font-semibold text-gray-900">{customer.contract || 'Monthly'}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Subscription Type</p>
          <p className="text-base font-semibold text-gray-900">{customer.subscriptionType || 'Basic'}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Payment Delay</p>
          <p className="text-base font-semibold text-gray-900">{formatNumber(customer.paymentDelay, ' days')}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Last Interaction</p>
          <p className="text-base font-semibold text-gray-900">{formatNumber(customer.lastInteraction, ' days ago')}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Support Tickets</p>
          <p className="text-base font-semibold text-gray-900">{formatNumber(customer.supportTickets)}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Usage Frequency</p>
          <p className="text-base font-semibold text-gray-900">{formatNumber(customer.usageFrequency, ' times/month')}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
