import React from "react";
import { StatCard } from "../components/analytics/StatCard";
import { StatusBarChart } from "../components/analytics/StatusBarChart";
import { SuccessPieChart } from "../components/analytics/SuccessPieChart";
import { AverageTimeBarChart } from "../components/analytics/AverageTimeBarChart";

const AnalyticsPage = () => {
  return (
    <div className="p-6 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="All applications" value="124" />
        <StatCard title="Success rate" value="12%" />
        <StatCard title="Average time in status" value="3.5 nap" />
      </div>

      <div className="space-y-8">
        <StatusBarChart />
        <SuccessPieChart />
        <AverageTimeBarChart />
      </div>
    </div>
  );
};

export default AnalyticsPage;
