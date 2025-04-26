import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const dummyData = [
  { status: "Applied", avgDays: 3 },
  { status: "Interview", avgDays: 5 },
  { status: "Offer", avgDays: 2 },
  { status: "Rejected", avgDays: 4 },
];

export const AverageTimeBarChart = () => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-2xl font-semibold mb-4">Average time by status</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dummyData}>
          <XAxis dataKey="status" />
          <YAxis label={{ value: "Napok", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Bar dataKey="avgDays" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
