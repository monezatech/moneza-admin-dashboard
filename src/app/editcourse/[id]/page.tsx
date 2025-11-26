"use client";

import { useState, useEffect } from "react";
import { apiService } from "../../../service/service";
import { Course } from "../../courses/page";
import { useParams, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const Spinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600 border-opacity-50"></div>
  </div>
);

export default function EditCourse() {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchCourse = async () => {
      if (id) {
        setLoading(true);
        try {
          const token = localStorage.getItem("token");
          const res = await apiService.getCourseById({ courseId: id, token });
          setCourse(res.course);
        } catch (error) {
          console.error("Error fetching course details", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCourse();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!course) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", course.title);
      formData.append("description", course.description);
      formData.append("price", course.price.toString());
      formData.append("category", course.category);
      formData.append("instructor", course.instructor);
      formData.append("status", course.status);

      await apiService.updateCourse({ courseId: id, token, formData, onUploadProgress: () => {} });
      toast.success("Course updated successfully");
      router.push("/courses");
    } catch (error) {
      console.error("Error updating course", error);
      toast.error("Failed to update course");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!course) {
    return <div className="p-6">Course not found.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Edit Course</h1>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={course.title}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            value={course.price}
            onChange={(e) =>
              setCourse({ ...course, price: Number(e.target.value) })
            }
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-xl cursor-pointer"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Course"}
        </button>
      </form>
    </div>
  );
}
