
import React from 'react';

interface ChurnGaugeProps {
  percentage: number;
}

const ChurnGauge = ({ percentage }: ChurnGaugeProps) => {
  const radius = 80;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getRiskLevel = (percentage: number) => {
    if (percentage >= 70) return { level: 'High Risk', color: 'text-red-600', bgColor: 'bg-red-100' };
    if (percentage >= 40) return { level: 'Medium Risk', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    return { level: 'Low Risk', color: 'text-green-600', bgColor: 'bg-green-100' };
  };

  const risk = getRiskLevel(percentage);

  const getStrokeColor = (percentage: number) => {
    if (percentage >= 70) return '#dc2626';
    if (percentage >= 40) return '#ea580c';
    return '#16a34a';
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            stroke="#e5e7eb"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress circle */}
          <circle
            stroke={getStrokeColor(percentage)}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Percentage text in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">{percentage}%</div>
            <div className="text-sm text-gray-500">Churn Risk</div>
          </div>
        </div>
      </div>
      
      {/* Risk level badge */}
      <div className={`px-3 py-1 rounded-full text-sm font-medium ${risk.bgColor} ${risk.color}`}>
        {risk.level}
      </div>
    </div>
  );
};

export default ChurnGauge;
