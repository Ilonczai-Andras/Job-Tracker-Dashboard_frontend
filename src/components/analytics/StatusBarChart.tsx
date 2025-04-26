import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface StatusBarChartProps {
  analytics: {
    status: string;
    count: number;
  }[];
}

export const StatusBarChart = ({ analytics }: StatusBarChartProps) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Number of applications by status
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={analytics}>
          <XAxis
            dataKey="status"
            tick={{ fontSize: 20, fontWeight: 500 }}
            tickFormatter={(value: string) =>
              value.charAt(0).toUpperCase() + value.slice(1)
            }
          />
          <YAxis allowDecimals={false} />
          <Tooltip
            contentStyle={{
              fontSize: "18px",
              fontWeight: "500",
              borderRadius: "8px",
              padding: "10px",
            }}
          />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
