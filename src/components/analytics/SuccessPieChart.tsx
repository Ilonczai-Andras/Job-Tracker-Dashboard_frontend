import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface SuccessPieChartProps {
  successRate: number;
}

const COLORS = ["#00C49F", "#FF8042"];

export const SuccessPieChart = ({ successRate }: SuccessPieChartProps) => {
  const chartData = [
    { name: "Success", value: successRate },
    { name: "Other", value: 100 - successRate },
  ];

  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-2xl font-semibold mb-4">Success Rate</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              fontSize: "18px",
              fontWeight: "500",
              borderRadius: "8px",
              padding: "10px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
