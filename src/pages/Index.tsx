import React, { useState, useEffect } from 'react';
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
import AddCustomerForm from '@/components/AddCustomerForm';
import customerService from '@/services/customerService';
import { Customer } from '@/types/customer';
import { Search, TrendingUp, Users, AlertTriangle, Home, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [customerData, setCustomerData] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [customerCount, setCustomerCount] = useState<number>(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Load customer count on mount and after operations
  const loadCustomerCount = async () => {
    try {
      const count = await customerService.getAllCustomers();
      setCustomerCount(count);
    } catch (error) {
      console.error('Error loading customer count:', error);
    }
  };

  useEffect(() => {
    loadCustomerCount();
  }, []);

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
      const customer = await customerService.getCustomer(customerId);
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
      const success = await customerService.deleteCustomer(customerId);
      if (success) {
        toast({
          title: "Customer Deleted",
          description: `Customer ${customerId} has been removed`,
        });
        setCustomerData(null);
        setSelectedCustomerId('');
        loadCustomerCount(); // Refresh the count after deletion
      } else {
        throw new Error('Failed to delete customer');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete customer",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500/10 to-purple-500/10 relative overflow-hidden">
      {/* Header */}
      <header className="bg-white/30 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <path d="M3.29 7L12 12.75 20.71 7" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <span className="text-xl font-semibold text-gray-900">Customer Churn AI</span>
            </div>
            <nav>
              <div 
                onClick={() => navigate('/')} 
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Background Doodles with increased visibility */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Analytics Dashboard Doodles - Top Left */}
        <svg className="absolute -top-16 -left-16 w-64 h-64 text-blue-400/70 transform rotate-12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 20h60v60H20z" stroke="currentColor" strokeWidth="0.5"/>
          <path d="M30 35h40M30 50h40M30 65h40" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="45" cy="35" r="2" fill="currentColor"/>
          <circle cx="65" cy="50" r="2" fill="currentColor"/>
          <circle cx="35" cy="65" r="2" fill="currentColor"/>
        </svg>

        {/* Data Flow - Top Right */}
        <svg className="absolute -top-8 -right-8 w-64 h-64 text-purple-400/70 transform -rotate-12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 20L40 40L60 30L80 50" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="40" cy="40" r="3" fill="currentColor"/>
          <circle cx="60" cy="30" r="3" fill="currentColor"/>
          <circle cx="80" cy="50" r="3" fill="currentColor"/>
        </svg>

        {/* Metrics Grid - Bottom Left */}
        <svg className="absolute -bottom-8 -left-8 w-64 h-64 text-blue-400/70 transform -rotate-12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 10h80v80H10z" stroke="currentColor" strokeWidth="0.5"/>
          <path d="M30 10v80M50 10v80M70 10v80" stroke="currentColor" strokeWidth="0.3"/>
          <path d="M10 30h80M10 50h80M10 70h80" stroke="currentColor" strokeWidth="0.3"/>
        </svg>

        {/* Customer Network - Bottom Right */}
        <svg className="absolute -bottom-16 -right-16 w-64 h-64 text-purple-400/70 transform rotate-12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="8" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="20" cy="30" r="4" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="80" cy="30" r="4" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="20" cy="70" r="4" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="80" cy="70" r="4" stroke="currentColor" strokeWidth="0.5"/>
          <path d="M50 50L20 30M50 50L80 30M50 50L20 70M50 50L80 70" stroke="currentColor" strokeWidth="0.5"/>
        </svg>

        {/* Floating Data Points */}
        <svg className="absolute top-1/4 left-8 w-40 h-40 text-blue-400/70 animate-pulse" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="3" fill="currentColor"/>
          <circle cx="30" cy="30" r="2" fill="currentColor"/>
          <circle cx="70" cy="30" r="2" fill="currentColor"/>
          <path d="M30 30L50 50L70 30" stroke="currentColor" strokeWidth="0.3"/>
        </svg>

        {/* AI Processing - Center */}
        <svg className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-48 h-48 text-purple-400/20 animate-pulse" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 20h60v60H20z" stroke="currentColor" strokeWidth="0.3"/>
          <path d="M35 35h30v30H35z" stroke="currentColor" strokeWidth="0.3"/>
          <path d="M45 45h20v20H45z" stroke="currentColor" strokeWidth="0.3"/>
          <circle cx="50" cy="50" r="2" fill="currentColor"/>
        </svg>

        {/* Data Flow Lines */}
        <svg className="absolute inset-0 w-full h-full text-blue-300/30" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 20Q25 40 50 20T100 20" stroke="currentColor" strokeWidth="0.2" fill="none">
            <animate attributeName="d" dur="10s" repeatCount="indefinite"
              values="M0 20Q25 40 50 20T100 20;
                      M0 25Q25 45 50 25T100 25;
                      M0 20Q25 40 50 20T100 20" />
          </path>
          <path d="M0 40Q25 60 50 40T100 40" stroke="currentColor" strokeWidth="0.2" fill="none">
            <animate attributeName="d" dur="12s" repeatCount="indefinite"
              values="M0 40Q25 60 50 40T100 40;
                      M0 45Q25 65 50 45T100 45;
                      M0 40Q25 60 50 40T100 40" />
          </path>
          <path d="M0 60Q25 80 50 60T100 60" stroke="currentColor" strokeWidth="0.2" fill="none">
            <animate attributeName="d" dur="15s" repeatCount="indefinite"
              values="M0 60Q25 80 50 60T100 60;
                      M0 65Q25 85 50 65T100 65;
                      M0 60Q25 80 50 60T100 60" />
          </path>
        </svg>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-400/70 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        {/* Additional Data Science Doodles - Mid Left */}
        <svg className="absolute top-1/3 left-32 w-48 h-48 text-blue-400/70 animate-pulse" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 90L30 70L50 80L70 40L90 60" stroke="currentColor" strokeWidth="0.5" fill="none"/>
          <circle cx="30" cy="70" r="2" fill="currentColor"/>
          <circle cx="50" cy="80" r="2" fill="currentColor"/>
          <circle cx="70" cy="40" r="2" fill="currentColor"/>
          <circle cx="90" cy="60" r="2" fill="currentColor"/>
        </svg>

        {/* Machine Learning Nodes - Mid Right */}
        <svg className="absolute top-1/2 right-24 w-40 h-40 text-purple-400/70 animate-pulse" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="20" r="5" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="20" cy="50" r="5" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="80" cy="50" r="5" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="50" cy="80" r="5" stroke="currentColor" strokeWidth="0.5"/>
          <path d="M50 20L20 50L50 80L80 50L50 20" stroke="currentColor" strokeWidth="0.5"/>
        </svg>

        {/* Code Brackets - Center Top */}
        <svg className="absolute top-24 left-1/2 transform -translate-x-1/2 w-32 h-32 text-blue-400/20 animate-pulse" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 20L10 50L30 80M70 20L90 50L70 80" stroke="currentColor" strokeWidth="0.5"/>
        </svg>

        {/* Additional Floating Elements */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-400/70 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="card shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <Search className="w-5 h-5 mr-2" />
                Customer Lookup
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Customer ID</label>
                  <Input
                    type="number"
                    placeholder="Enter Customer ID (e.g., 5)"
                    value={selectedCustomerId}
                    onChange={(e) => setSelectedCustomerId(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleCustomerLookup(selectedCustomerId);
                      }
                    }}
                  />
                </div>
                <Button 
                  onClick={() => handleCustomerLookup(selectedCustomerId)}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isLoading ? 'Analyzing...' : 'Analyze Customer'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="card shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <UserPlus className="w-5 h-5 mr-2" />
                Add New Customer
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">Add a new customer to the database and get instant churn predictions.</p>
              <Button 
                onClick={() => setShowAddCustomer(true)}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add Customer
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Add Customer Form Modal */}
        {showAddCustomer && (
          <AddCustomerForm 
            isOpen={showAddCustomer}
            onClose={() => {
              setShowAddCustomer(false);
              loadCustomerCount(); // Refresh the count after adding
            }}
          />
        )}

        {/* Main Content */}
        {customerData && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Churn Risk Gauge */}
              <Card className="card shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-gray-900">Churn Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <ChurnGauge percentage={customerData.churnProbability} />
                </CardContent>
              </Card>

              {/* Customer Details */}
              <Card className="card shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-gray-900">Customer Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <CustomerDetails customer={customerData} />
                </CardContent>
              </Card>

              {/* Customer Actions */}
              <Card className="card shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-gray-900">Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <CustomerActions 
                    customerId={customerData.id}
                    onDeleteCustomer={handleDeleteCustomer}
                  />
                </CardContent>
              </Card>

              {/* Churn Contributing Factors */}
              <Card className="card shadow-lg border-0 lg:col-span-3">
                <CardHeader>
                  <CardTitle className="text-gray-900">Churn Contributing Factors</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChurnFactors factors={customerData.churnFactors || {}} />
                </CardContent>
              </Card>

              {/* Strategy Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:col-span-3">
                <Card className="card shadow-lg border-0">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                    <CardTitle>Main Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
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

                <Card className="card shadow-lg border-0">
                  <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
                    <CardTitle>Commercial Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
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

              {/* Historical Data */}
              <Card className="card shadow-lg border-0 lg:col-span-3">
                <CardHeader>
                  <CardTitle className="text-gray-900">Historical Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <PredictionChart customer={customerData} />
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
