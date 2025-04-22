import { useState } from "react";
import ReminderList from "../Reminder/ReminderList";
import { useAuth0 } from "@auth0/auth0-react";

const ReminderView = () => {
  const { isAuthenticated } = useAuth0();

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "upcoming" | "sent" | "unsent">(
    "all"
  );

  if (!isAuthenticated) return <p>Please log in to see your reminders.</p>;

  return (
    <div className="space-y-6 p-4">
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
