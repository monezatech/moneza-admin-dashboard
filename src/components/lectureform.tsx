import { useState } from "react";

export default function LectureForm({ onSubmit, onCancel, initialValues }: {
  onSubmit: (data: { title: string; duration: string }) => void;
  onCancel: () => void;
  initialValues?: { title: string; duration: string };
}) {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [duration, setDuration] = useState(initialValues?.duration || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert("Lecture title is required");
    onSubmit({ title, duration });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded-2xl p-6 space-y-4 w-full max-w-md"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        {initialValues ? "Edit Lecture" : "Add New Lecture"}
      </h2>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Lecture Title</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Introduction to GraphQL"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Duration</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="e.g., 15 mins"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}
