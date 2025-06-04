
import React from 'react';
import { Customer } from '@/types/customer';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface CustomerDetailsProps {
  customer: Customer;
}

const CustomerDetails = ({ customer }: CustomerDetailsProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-500">Customer ID</label>
          <p className="text-sm font-semibold text-gray-900">{customer.id}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Gender</label>
          <p className="text-sm text-gray-900">{customer.gender}</p>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-500">Age</label>
          <p className="text-sm text-gray-900">{customer.age} years</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Tenure</label>
          <p className="text-sm text-gray-900">{customer.tenure} months</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-500">Monthly Charges</label>
          <p className="text-sm font-semibold text-gray-900">${customer.monthlyCharges}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Total Charges</label>
          <p className="text-sm font-semibold text-gray-900">${customer.totalCharges}</p>
        </div>
      </div>

      <Separator />

      <div>
        <label className="text-sm font-medium text-gray-500 mb-2 block">Contract Type</label>
        <Badge variant={customer.contract === 'Month-to-month' ? 'destructive' : 'default'}>
          {customer.contract}
        </Badge>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-500 mb-2 block">Payment Method</label>
        <Badge variant="outline">{customer.paymentMethod}</Badge>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-500">Support Tickets</label>
          <p className="text-sm text-gray-900">{customer.supportTickets}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Usage Frequency</label>
          <p className="text-sm text-gray-900">{customer.usageFrequency}/week</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
