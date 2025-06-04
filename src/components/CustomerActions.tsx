
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Edit } from 'lucide-react';

interface CustomerActionsProps {
  customerId: string;
  onDeleteCustomer: (customerId: string) => void;
}

const CustomerActions = ({ customerId, onDeleteCustomer }: CustomerActionsProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleDeleteConfirm = () => {
    onDeleteCustomer(customerId);
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="space-y-4">
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
