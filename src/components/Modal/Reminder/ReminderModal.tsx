import { useState, useEffect } from "react";
import useUpdateReminder from "../../../hooks/Reminder/useUpdateReminder";
import toast from "react-hot-toast";
import { Reminder } from "../../../hooks/Reminder/types";
import { ReminderCreateInput } from "../../../hooks/Reminder/types";

type ReminderFormData = ReminderCreateInput & { id: number };

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  reminder: Reminder | null;
}

const formatDateForInput = (value: string): string => {
  const date = new Date(value);
  const pad = (n: number) => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hour}:${minute}`;
};

const ReminderModal = ({ isOpen, onClose, reminder }: ReminderModalProps) => {
  const updateReminder = useUpdateReminder();
  const [formData, setFormData] = useState<ReminderFormData>({
    id: 0,
    application_id: null,
    title: "",
    description: "",
    remind_at: "",
    is_sent: false,
    notification_offset: 0,
  });

  useEffect(() => {
    if (reminder) {
      const { id, application_id, title, description, remind_at, is_sent } =
        reminder;

      setFormData({
        notification_offset: reminder.notification_offset || 0,
        id,
        application_id,
        title: title || "",
        description: description || "",
        remind_at: formatDateForInput(remind_at),
        is_sent,
      });
    }
  }, [reminder]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "application_id" || name === "notification_offset"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reminder) return;

    const { id, ...data } = formData;

    updateReminder.mutate(
      { id, data },
      {
        onSuccess: () => {
          toast.success("Reminder successfully updated!");
          onClose();
        },
        onError: () => {
          toast.error("Failed to update reminder");
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl mb-4 text-black">Editing a reminder</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-black"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-black"
          />
          <input
            name="remind_at"
            type="datetime-local"
            value={formData.remind_at}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-black"
            required
          />
          <select
            name="notification_offset"
            value={formData.notification_offset}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-black"
          >
            <option value={0}>At the time of the event</option>
            <option value={15}>15 minutes before</option>
            <option value={60}>1 hour before</option>
            <option value={360}>6 hours before</option>
            <option value={1440}>1 day before</option>
          </select>

          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-black text-white border border-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReminderModal;
