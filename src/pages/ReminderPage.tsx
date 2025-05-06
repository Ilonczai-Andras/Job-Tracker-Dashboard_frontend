import { useState } from "react";
import ReminderList from "../components/Reminder/ReminderList";
import { useAuth0 } from "@auth0/auth0-react";
import { Skeleton } from "../components/Skeleton"; // Import the Skeleton component

const ReminderView = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "upcoming" | "sent" | "unsent">(
    "all"
  );

  if (isLoading) {
    return (
      <div className="space-y-6 p-4 pt-16">
        {" "}
        {/* Added pt-16 for top padding */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <Skeleton width={200} height={24} />
          <div className="flex flex-col sm:flex-row gap-2">
            <Skeleton width={300} height={36} />
            <Skeleton width={150} height={36} />
          </div>
        </div>
        {/* Placeholder for the ReminderList - adjust height as needed */}
        <div className="space-y-4">
          <Skeleton height={80} />
          <Skeleton height={80} />
          <Skeleton height={80} />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return <p>Please log in to see your reminders.</p>;

  return (
    <div className="space-y-6 p-4 pt-24">
      {" "}
      {/* Added pt-16 for top padding */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-xl font-semibold">Managing reminders</h2>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Search title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-1 rounded text-black"
          />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(
                e.target.value as "all" | "upcoming" | "sent" | "unsent"
              )
            }
            className="border px-3 py-1 rounded text-black"
          >
            <option value="all">All reminders</option>
            <option value="upcoming">Next 7 days</option>
            <option value="unsent">Unsent</option>
            <option value="sent">Sent</option>
          </select>
        </div>
      </div>
      <ReminderList search={searchTerm} filter={filter} />
    </div>
  );
};

export default ReminderView;
