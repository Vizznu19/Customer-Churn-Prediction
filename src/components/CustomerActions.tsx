
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockCustomerService } from '@/services/mockCustomerService';
import { useToast } from '@/hooks/use-toast';
import { Trash2, UserPlus, Edit } from 'lucide-react';

interface CustomerActionsProps {
  customerId: string;
  onDeleteCustomer: (customerId: string) => void;
}

const CustomerActions = ({ customerId, onDeleteCustomer }: CustomerActionsProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const [newCustomer, setNewCustomer] = useState({
    gender: '',
    age: '',
    tenure: '',
    monthlyCharges: '',
    totalCharges: '',
    contract: '',
    paymentMethod: '',
    supportTickets: '',
    usageFrequency: ''
  });

  const handleAddCustomer = async () => {
    try {
      // Validate required fields
      if (!newCustomer.gender || !newCustomer.age || !newCustomer.monthlyCharges) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }

      const customerData = {
        gender: newCustomer.gender,
        age: parseInt(newCustomer.age),
        tenure: parseInt(newCustomer.tenure) || 0,
        monthlyCharges: parseFloat(newCustomer.monthlyCharges),
        totalCharges: parseFloat(newCustomer.totalCharges) || parseFloat(newCustomer.monthlyCharges),
        contract: newCustomer.contract || 'Month-to-month',
        paymentMethod: newCustomer.paymentMethod || 'Electronic check',
        supportTickets: parseInt(newCustomer.supportTickets) || 0,
        usageFrequency: parseInt(newCustomer.usageFrequency) || 1
      };

      const result = await mockCustomerService.addCustomer(customerData);
      
      toast({
        title: "Customer Added",
        description: `New customer ${result.id} has been added successfully`,
      });

      setIsAddDialogOpen(false);
      setNewCustomer({
        gender: '',
        age: '',
        tenure: '',
        monthlyCharges: '',
        totalCharges: '',
        contract: '',
        paymentMethod: '',
        supportTickets: '',
        usageFrequency: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add customer",
        variant: "destructive"
      });
    }
  };

  const handleDeleteConfirm = () => {
    onDeleteCustomer(customerId);
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Add New Customer */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full bg-green-600 hover:bg-green-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Add New Customer
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] bg-white">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>
              Enter the details for the new customer. Required fields are marked with *.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select value={newCustomer.gender} onValueChange={(value) => setNewCustomer({...newCustomer, gender: value})}>
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
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter age"
                value={newCustomer.age}
                onChange={(e) => setNewCustomer({...newCustomer, age: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tenure">Tenure (months)</Label>
              <Input
                id="tenure"
                type="number"
                placeholder="0"
                value={newCustomer.tenure}
                onChange={(e) => setNewCustomer({...newCustomer, tenure: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyCharges">Monthly Charges *</Label>
              <Input
                id="monthlyCharges"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={newCustomer.monthlyCharges}
                onChange={(e) => setNewCustomer({...newCustomer, monthlyCharges: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contract">Contract Type</Label>
              <Select value={newCustomer.contract} onValueChange={(value) => setNewCustomer({...newCustomer, contract: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select contract" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  <SelectItem value="Month-to-month">Month-to-month</SelectItem>
                  <SelectItem value="One year">One year</SelectItem>
                  <SelectItem value="Two year">Two year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select value={newCustomer.paymentMethod} onValueChange={(value) => setNewCustomer({...newCustomer, paymentMethod: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  <SelectItem value="Electronic check">Electronic check</SelectItem>
                  <SelectItem value="Mailed check">Mailed check</SelectItem>
                  <SelectItem value="Bank transfer">Bank transfer</SelectItem>
                  <SelectItem value="Credit card">Credit card</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportTickets">Support Tickets</Label>
              <Input
                id="supportTickets"
                type="number"
                placeholder="0"
                value={newCustomer.supportTickets}
                onChange={(e) => setNewCustomer({...newCustomer, supportTickets: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="usageFrequency">Usage Frequency (per week)</Label>
              <Input
                id="usageFrequency"
                type="number"
                placeholder="1"
                value={newCustomer.usageFrequency}
                onChange={(e) => setNewCustomer({...newCustomer, usageFrequency: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCustomer} className="bg-green-600 hover:bg-green-700">
              Add Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Customer */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" className="w-full">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Customer
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Delete Customer</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete customer {customerId}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Customer (Placeholder) */}
      <Button variant="outline" className="w-full" disabled>
        <Edit className="w-4 h-4 mr-2" />
        Edit Customer (Coming Soon)
      </Button>
    </div>
  );
};

export default CustomerActions;
