import React from 'react';
import { Customer } from '@/types/customer';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PredictionChartProps {
  customer: Customer;
}

const PredictionChart: React.FC<PredictionChartProps> = ({ customer }) => {
  // Generate historical data points based on customer metrics
  const generateHistoricalData = () => {
    const months = 6;
    const data = [];
    const baseRisk = customer.churnProbability;
    
    for (let i = 0; i < months; i++) {
      const monthsAgo = months - i - 1;
      const riskVariation = Math.sin(i) * 10; // Create some natural variation
      const risk = Math.max(0, Math.min(100, baseRisk + riskVariation));
      
      data.push({
        month: `Month ${monthsAgo + 1}`,
        risk: Math.round(risk)
      });
    }
    
    return data;
  };

  const data = generateHistoricalData();

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="risk"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ fill: '#2563eb', strokeWidth: 2 }}
            name="Churn Risk"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PredictionChart;
