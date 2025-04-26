import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const dummyData = [
  { status: "Applied", count: 50 },
  { status: "Interview", count: 20 },
  { status: "Offer", count: 5 },
  { status: "Rejected", count: 25 },
];

export const StatusBarChart = () => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-2xl font-semibold mb-4">Number of applications by status</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dummyData}>
          <XAxis dataKey="status" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
