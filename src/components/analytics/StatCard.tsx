import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 flex items-center space-x-4">
      {icon && <div className="text-3xl">{icon}</div>}
      <div>
        <div className="text-xl text-gray-500">{title}</div>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </div>
  );
};
