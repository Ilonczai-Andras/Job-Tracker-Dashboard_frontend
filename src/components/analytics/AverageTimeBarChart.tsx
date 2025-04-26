import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AverageTimeBarChartProps {
  averageTimePerStatus: {
    status: string;
    average_days: number;
  }[];
}

export const AverageTimeBarChart = ({
  averageTimePerStatus,
}: AverageTimeBarChartProps) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-2xl font-semibold mb-4">Average time by status</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={averageTimePerStatus}>
          <XAxis
            dataKey="status"
            tick={{ fontSize: 20, fontWeight: 500 }}
            tickFormatter={(value: string) =>
              value.charAt(0).toUpperCase() + value.slice(1)
            }
          />
          <YAxis
            label={{ value: "Napok", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            contentStyle={{
              fontSize: "18px",
              fontWeight: "500",
              borderRadius: "8px",
              padding: "10px",
            }}
          />
          <Bar dataKey="average_days" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
