import React, { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import customerService from '../services/customerService';
import { useToast } from '../hooks/use-toast';
import { UserPlus } from 'lucide-react';
import { NewCustomerData, ContractType, SubscriptionType, Gender } from '../types/customer';

interface AddCustomerFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCustomerForm: React.FC<AddCustomerFormProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();

  const [newCustomer, setNewCustomer] = useState<Partial<NewCustomerData>>({
    gender: '',
    age: undefined,
    tenure: undefined,
    monthlyCharges: undefined,
    contract: 'Monthly',
    subscriptionType: 'Basic',
    paymentDelay: 0,
    lastInteraction: 0,
    supportTickets: 0,
    usageFrequency: 1
  });

  const handleAddCustomer = async () => {
    try {
      // Validate required fields
      if (!newCustomer.gender || !newCustomer.age || !newCustomer.monthlyCharges || !newCustomer.tenure) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields (Gender, Age, Monthly Charges, Tenure)",
          variant: "destructive"
        });
        return;
      }

      // Ensure numeric fields are valid numbers
      const age = Number(newCustomer.age);
      const monthlyCharges = Number(newCustomer.monthlyCharges);
      const tenure = Number(newCustomer.tenure);
      const paymentDelay = Number(newCustomer.paymentDelay) || 0;
      const lastInteraction = Number(newCustomer.lastInteraction) || 0;

      if (isNaN(age) || age <= 0) {
        toast({
          title: "Validation Error",
          description: "Age must be a positive number",
          variant: "destructive"
        });
        return;
      }

      if (isNaN(monthlyCharges) || monthlyCharges < 0) {
        toast({
          title: "Validation Error",
          description: "Monthly charges must be a non-negative number",
          variant: "destructive"
        });
        return;
      }

      const customerData: NewCustomerData = {
        gender: newCustomer.gender as Gender,
        age: age,
        tenure: tenure,
        monthlyCharges: monthlyCharges,
        contract: newCustomer.contract as ContractType,
        subscriptionType: newCustomer.subscriptionType as SubscriptionType,
        paymentDelay: paymentDelay,
        lastInteraction: lastInteraction,
        supportTickets: Number(newCustomer.supportTickets) || 0,
        usageFrequency: Number(newCustomer.usageFrequency) || 1
      };

      const result = await customerService.addCustomer(customerData);
      
      toast({
        title: "Success",
        description: `Customer added successfully! ID: ${result.id}`,
      });

      onClose();
      setNewCustomer({
        gender: '',
        age: undefined,
        tenure: undefined,
        monthlyCharges: undefined,
        contract: 'Monthly',
        subscriptionType: 'Basic',
        paymentDelay: 0,
        lastInteraction: 0,
        supportTickets: 0,
        usageFrequency: 1
      });
    } catch (error) {
      console.error('Error adding customer:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add customer. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <UserPlus className="w-5 h-5 mr-2 text-green-600" />
            Add New Customer
          </DialogTitle>
          <DialogDescription>
            Enter the customer details below. Required fields are marked with *.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="gender" className="flex items-center">
              Gender <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select value={newCustomer.gender} onValueChange={(value: Gender) => setNewCustomer({...newCustomer, gender: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="age" className="flex items-center">
              Age <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter age"
              value={newCustomer.age || ''}
              onChange={(e) => setNewCustomer({...newCustomer, age: Number(e.target.value)})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tenure" className="flex items-center">
              Tenure (months) <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="tenure"
              type="number"
              required
              placeholder="Enter tenure"
              value={newCustomer.tenure || ''}
              onChange={(e) => setNewCustomer({...newCustomer, tenure: Number(e.target.value)})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="monthlyCharges" className="flex items-center">
              Monthly Charges ($) <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="monthlyCharges"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={newCustomer.monthlyCharges || ''}
              onChange={(e) => setNewCustomer({...newCustomer, monthlyCharges: Number(e.target.value)})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contract">Contract Type</Label>
            <Select value={newCustomer.contract} onValueChange={(value: ContractType) => setNewCustomer({...newCustomer, contract: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Month-to-month (default)" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="Monthly">Month-to-month</SelectItem>
                <SelectItem value="Quarterly">Quarterly</SelectItem>
                <SelectItem value="Annual">Annual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subscriptionType">Subscription Type</Label>
            <Select value={newCustomer.subscriptionType} onValueChange={(value: SubscriptionType) => setNewCustomer({...newCustomer, subscriptionType: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Basic (default)" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="Basic">Basic</SelectItem>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentDelay">Payment Delay (days)</Label>
            <Input
              id="paymentDelay"
              type="number"
              placeholder="0"
              value={newCustomer.paymentDelay || ''}
              onChange={(e) => setNewCustomer({...newCustomer, paymentDelay: Number(e.target.value)})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastInteraction">Last Interaction (days ago)</Label>
            <Input
              id="lastInteraction"
              type="number"
              placeholder="0"
              value={newCustomer.lastInteraction || ''}
              onChange={(e) => setNewCustomer({...newCustomer, lastInteraction: Number(e.target.value)})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="supportTickets">Support Tickets</Label>
            <Input
              id="supportTickets"
              type="number"
              placeholder="0"
              value={newCustomer.supportTickets || ''}
              onChange={(e) => setNewCustomer({...newCustomer, supportTickets: Number(e.target.value)})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="usageFrequency">Usage Frequency (per month)</Label>
            <Input
              id="usageFrequency"
              type="number"
              placeholder="1"
              value={newCustomer.usageFrequency || ''}
              onChange={(e) => setNewCustomer({...newCustomer, usageFrequency: Number(e.target.value)})}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleAddCustomer}>Add Customer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCustomerForm;
