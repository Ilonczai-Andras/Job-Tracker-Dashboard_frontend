import ReminderList from "../Reminder/ReminderList";
import { useAuth0 } from "@auth0/auth0-react";

const ReminderView = () => {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) return <p>Please log in to see your reminders.</p>;

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl font-semibold">Managing reminders</h2>
      <ReminderList />
    </div>
  );
};

export default ReminderView;
