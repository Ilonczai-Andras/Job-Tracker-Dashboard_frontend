import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const dummyData = [
  { name: "Success", value: 10 },
  { name: "Others", value: 90 },
];

const COLORS = ["#00C49F", "#FF8042"];

export const SuccessPieChart = () => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Success rate</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={dummyData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {dummyData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
