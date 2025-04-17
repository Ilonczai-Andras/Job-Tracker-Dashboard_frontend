import { useState } from "react";
import { useReminders } from "../../hooks/Reminder/useGetReminders";
import useDeleteReminder from "../../hooks/Reminder/useDeleteReminder";
import ReminderModal from "../Modal/Reminder/ReminderModal";
import { Spinner } from "../Spinner";
import { Reminder } from "../../hooks/Reminder/types";

const ReminderList = () => {
  const { data: reminders = [], isLoading, error } = useReminders();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(
    null
  );
  const deleteReminder = useDeleteReminder();

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <div className="text-center text-red-600 py-4">
        ⚠ An error occurred when loading data. Please try again later.
      </div>
    );

  const openModal = (reminder: Reminder) => {
    setSelectedReminder(reminder);
    setModalOpen(true);
  };

  return (
    <div>
      {reminders.map((reminder) => (
        <div
          key={reminder.id}
          className="border rounded p-4 mb-2 flex justify-between items-start bg-gray-900"
        >
          <div>
            <h3 className="text-lg font-semibold text-white">
              {reminder.title}
            </h3>
            <p className="text-white">{reminder.description}</p>
            <p className="text-sm text-white">
              Reminder date: {new Date(reminder.remind_at).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col items-end ml-4">
            <button
              onClick={() => deleteReminder.mutate(reminder.id)}
              className="m-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>

            <button
              onClick={() => openModal(reminder)}
              className="m-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Update
            </button>
          </div>
        </div>
      ))}
      <ReminderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        reminder={selectedReminder}
      />
    </div>
  );
};

export default ReminderList;
