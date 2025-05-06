import React from "react";
import { StatCard } from "../components/analytics/StatCard";
import { StatusBarChart } from "../components/analytics/StatusBarChart";
import { SuccessPieChart } from "../components/analytics/SuccessPieChart";
import { AverageTimeBarChart } from "../components/analytics/AverageTimeBarChart";
import { useAnalytics } from "../hooks/Analytics/useApplicationsPerStatus";
import { Skeleton } from "../components/Skeleton"; // Import a Skeleton component

const AnalyticsPage = () => {
  const { data: analytics, isLoading, error } = useAnalytics();
  const totalDays =
    analytics?.averageTimePerStatus?.reduce(
      (sum: number, item: { average_days: string }) =>
        sum + parseFloat(item.average_days),
      0
    ) || 0;
  const avgDays = analytics?.averageTimePerStatus?.length
    ? (totalDays / analytics.averageTimePerStatus.length).toFixed(2)
    : "0";

  if (isLoading) {
    return (
      <div className="p-6 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Skeleton height={100} />
          <Skeleton height={100} />
          <Skeleton height={100} />
        </div>
        <div className="space-y-8">
          <Skeleton height={300} />
          <Skeleton height={300} />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-6">Error loading analytics.</div>;
  }

  return (
    <div className="p-6 space-y-8 pt-24">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="All applications"
          value={analytics?.applicationsPerStatus?.length || 0}
        />
        <StatCard
          title="Success rate"
          value={`${analytics?.successRate?.toFixed(1) || 0}%`}
        />
        <StatCard title="Average time in status" value={`${avgDays} days`} />
      </div>
      <div className="space-y-8">
        <StatusBarChart analytics={analytics?.applicationsPerStatus || []} />
        <SuccessPieChart successRate={analytics?.successRate || 0} />
        <AverageTimeBarChart
          averageTimePerStatus={analytics?.averageTimePerStatus || []}
        />
      </div>
    </div>
  );
};

export default AnalyticsPage;
