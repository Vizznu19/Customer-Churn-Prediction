
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PredictionChart = () => {
  // Sample data for recent predictions
  const data = [
    { customerId: '1234-ABCD', churnProbability: 75, riskLevel: 'High' },
    { customerId: '5678-EFGH', churnProbability: 45, riskLevel: 'Medium' },
    { customerId: '9012-IJKL', churnProbability: 25, riskLevel: 'Low' },
    { customerId: '3456-MNOP', churnProbability: 85, riskLevel: 'High' },
    { customerId: '7890-QRST', churnProbability: 35, riskLevel: 'Low' },
    { customerId: '2468-UVWX', churnProbability: 60, riskLevel: 'Medium' },
    { customerId: '1357-YZKM', churnProbability: 90, riskLevel: 'High' },
    { customerId: '8642-LNPQ', churnProbability: 20, riskLevel: 'Low' }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{`Customer: ${label}`}</p>
          <p className="text-blue-600">{`Churn Risk: ${data.churnProbability}%`}</p>
          <p className={`text-sm ${
            data.riskLevel === 'High' ? 'text-red-600' : 
            data.riskLevel === 'Medium' ? 'text-orange-600' : 'text-green-600'
          }`}>
            {`Risk Level: ${data.riskLevel}`}
          </p>
        </div>
      );
    }
    return null;
  };

  const getBarColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'High': return '#dc2626';
      case 'Medium': return '#ea580c';
      case 'Low': return '#16a34a';
      default: return '#6b7280';
    }
  };

  const CustomBar = (props: any) => {
    const { payload } = props;
    const fill = getBarColor(payload.riskLevel);
    return <Bar {...props} fill={fill} />;
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis 
            dataKey="customerId" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            label={{ value: 'Churn Probability (%)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar 
            dataKey="churnProbability" 
            name="Churn Probability (%)"
            shape={<CustomBar />}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PredictionChart;
