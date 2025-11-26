"use client";

import { useState } from "react";
import { apiService } from "../../../service/service";
import { useParams, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function AddLecture() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !content || !video) {
      toast.error("Please fill all fields and select a video");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("video", video);
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }
      formData.append("refCourse", id as string);

      await apiService.createLesson({ token, formData });
      toast.success("Lecture added successfully");
      router.push(`/courses/${id}`);
    } catch (error) {
      console.error("Error adding lecture", error);
      toast.error("Failed to add lecture");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Add Lecture</h1>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Video</label>
          <input
            type="file"
            onChange={(e) => setVideo(e.target.files ? e.target.files[0] : null)}
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Thumbnail</label>
          <input
            type="file"
            onChange={(e) =>
              setThumbnail(e.target.files ? e.target.files[0] : null)
            }
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-xl cursor-pointer"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Lecture"}
        </button>
      </form>
    </div>
  );
}
