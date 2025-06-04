
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ChurnGauge from '@/components/ChurnGauge';
import CustomerDetails from '@/components/CustomerDetails';
import ChurnFactors from '@/components/ChurnFactors';
import CustomerActions from '@/components/CustomerActions';
import PredictionChart from '@/components/PredictionChart';
import { mockCustomerService } from '@/services/mockCustomerService';
import { Customer } from '@/types/customer';
import { Search, TrendingUp, Users, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [customerData, setCustomerData] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Get sample customer IDs for the dropdown
  const sampleCustomers = mockCustomerService.getSampleCustomers();
  const totalCustomers = mockCustomerService.getTotalCustomers();
  const averageChurnRate = mockCustomerService.getAverageChurnRate();

  const handleCustomerLookup = async (customerId: string) => {
    if (!customerId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid Customer ID",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const customer = await mockCustomerService.getCustomer(customerId);
      if (customer) {
        setCustomerData(customer);
        setSelectedCustomerId(customerId);
        toast({
          title: "Customer Found",
          description: `Loaded data for customer ${customerId}`,
        });
      } else {
        toast({
          title: "Customer Not Found",
          description: `No customer found with ID: ${customerId}`,
          variant: "destructive"
        });
        setCustomerData(null);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load customer data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCustomer = async (customerId: string) => {
    try {
      await mockCustomerService.deleteCustomer(customerId);
      toast({
        title: "Customer Deleted",
        description: `Customer ${customerId} has been removed`,
      });
      setCustomerData(null);
      setSelectedCustomerId('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete customer",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customer Churn Navigator</h1>
              <p className="mt-1 text-sm text-gray-600">Advanced churn prediction and customer analytics</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="px-3 py-1">
                <Users className="w-4 h-4 mr-1" />
                {totalCustomers.toLocaleString()} Customers
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                {averageChurnRate}% Avg Churn
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Customer Lookup Section */}
        <Card className="mb-8 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Customer Lookup
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Customer ID</label>
                <Input
                  placeholder="Enter Customer ID (e.g., 3868-QPYBK)"
                  value={selectedCustomerId}
                  onChange={(e) => setSelectedCustomerId(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleCustomerLookup(selectedCustomerId);
                    }
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Or Select from Recent</label>
                <Select
                  value={selectedCustomerId}
                  onValueChange={setSelectedCustomerId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a customer..." />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    {sampleCustomers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.id} - Risk: {customer.churnProbability}%
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={() => handleCustomerLookup(selectedCustomerId)}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? 'Analyzing...' : 'Analyze Customer'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Customer Analysis Results */}
        {customerData && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Churn Risk Gauge */}
              <Card className="shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
                    Churn Risk Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChurnGauge percentage={customerData.churnProbability} />
                </CardContent>
              </Card>

              {/* Customer Details */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Customer Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <CustomerDetails customer={customerData} />
                </CardContent>
              </Card>

              {/* Customer Actions */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <CustomerActions 
                    customerId={customerData.id}
                    onDeleteCustomer={handleDeleteCustomer}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Churn Contributing Factors */}
            <Card className="mb-8 shadow-lg">
              <CardHeader>
                <CardTitle>Churn Contributing Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <ChurnFactors customer={customerData} />
              </CardContent>
            </Card>

            {/* Strategy Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                  <CardTitle>Main Strategy</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Retention Focus</h4>
                        <p className="text-gray-600 text-sm">
                          {customerData.churnProbability > 70 
                            ? "High-risk customer requires immediate intervention"
                            : customerData.churnProbability > 40
                            ? "Moderate risk - implement preventive measures"
                            : "Low risk - maintain current engagement level"
                          }
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Engagement Strategy</h4>
                        <p className="text-gray-600 text-sm">
                          Increase touchpoints and personalized communication based on usage patterns
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
                  <CardTitle>Commercial Strategy</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Pricing Optimization</h4>
                        <p className="text-gray-600 text-sm">
                          {customerData.monthlyCharges > 70
                            ? "Consider offering loyalty discounts or value-added services"
                            : "Opportunity for service upgrades and cross-selling"
                          }
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Service Enhancement</h4>
                        <p className="text-gray-600 text-sm">
                          Focus on improving areas with low satisfaction scores
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* Prediction Chart */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Recent Churn Predictions</CardTitle>
          </CardHeader>
          <CardContent>
            <PredictionChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
