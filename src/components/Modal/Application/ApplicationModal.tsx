import Modal from "../Modal";
import { useState } from "react";
import useCreateApplication from "../../../hooks/Application/useCreateApplication";
import { ApplicationCreateInput } from "../../../hooks/Application/types";
import useCreateReminder from "../../../hooks/Reminder/useCreateReminder";
import { toast } from "react-hot-toast";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApplicationModal = ({ isOpen, onClose }: ApplicationModalProps) => {
  const [formData, setFormData] = useState<ApplicationCreateInput>({
    title: "",
    description: "",
    company: "",
    status: "todo",
    link: "",
    deadline: "",
  });
  const [notificationOffset, setNotificationOffset] = useState(0);

  const createApplication = useCreateApplication();
  const createReminder = useCreateReminder();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createApplication.mutate(formData, {
      onSuccess: (newApp) => {
        toast.success("Application successfully saved!");

        if (newApp.deadline) {
          const remindLocal = new Date(newApp.deadline);
          const remindUTC = new Date(
            remindLocal.getTime() - remindLocal.getTimezoneOffset() * 60000
          );

          createReminder.mutate(
            {
              application_id: newApp.id,
              title: newApp.title,
              description: newApp.description,
              remind_at: remindUTC.toISOString(),
              is_sent: false,
              notification_offset: notificationOffset,
            },
            {
              onSuccess: () => {
                toast.success("Reminder successfully saved!!");
                onClose();
              },
              onError: () => {
                toast.error("❌ An error occurred when saving your Reminder.");
              },
            }
          );
        }

        onClose();
      },
      onError: () => {
        toast.error("❌ An error occurred when saving your application.");
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl mb-4">New Application</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-black"
          required
        />

        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-black"
        />

        <label
          htmlFor="company"
          className="block text-sm font-medium text-gray-700"
        >
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-black"
        />

        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-black"
          required
        >
          <option value="" disabled hidden>
            Select status
          </option>
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="interview">Interview</option>
          <option value="done">Done</option>
        </select>

        <label
          htmlFor="link"
          className="block text-sm font-medium text-gray-700"
        >
          Application Link
        </label>
        <input
          id="link"
          name="link"
          type="url"
          placeholder="Link (https://example.com)"
          value={formData.link}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-black"
        />

        <label
          htmlFor="deadline"
          className="block text-sm font-medium text-gray-700"
        >
          Deadline
        </label>
        <input
          id="deadline"
          name="deadline"
          type="datetime-local"
          value={formData.deadline}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-black"
          required
        />

        <label
          htmlFor="notificationOffset"
          className="block text-sm font-medium text-gray-700"
        >
          When should we notify you?
        </label>
        <select
          id="notificationOffset"
          value={notificationOffset}
          onChange={(e) => setNotificationOffset(Number(e.target.value))}
          className="w-full border px-3 py-2 rounded text-black"
        >
          <option value={0}>At the time of the event</option>
          <option value={15}>15 minutes before</option>
          <option value={60}>1 hour before</option>
          <option value={360}>6 hours before</option>
          <option value={1440}>1 day before</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={createApplication.isPending}
        >
          {createApplication.isPending ? "Saving..." : "Save Application"}
        </button>

        {createApplication.isError && (
          <p className="text-red-600 mt-2 text-sm">
            ⚠ An error occurred when saving your application. Try again!
          </p>
        )}
      </form>
    </Modal>
  );
};

export default ApplicationModal;
