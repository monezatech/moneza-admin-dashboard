"use client";

"use client";

import { useState, useEffect } from "react";
import { apiService } from "../../../service/service";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Lesson {
  _id: string;
  title: string;
  content: string;
  thumbUrl: string;
}

interface Category {
  _id: string;
  name: string;
}

interface Instructor {
  _id: string;
  name: string;
}

interface CourseDetailsType {
  _id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  category: Category;
  instructor: Instructor;
  price: number;
  isPaid: boolean;
  lessons: Lesson[];
  status: "active" | "inactive" | "archived";
  createdAt: string;
}

const Spinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600 border-opacity-50"></div>
  </div>
);

export default function CourseDetails() {
  const [course, setCourse] = useState<CourseDetailsType | null>(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchCourse = async () => {
      if (id) {
        setLoading(true);
        try {
          const token = localStorage.getItem("token");
          const res = await apiService.getCourseById({ courseId: id, token });
          console.log("Course data:", res.course);
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

  if (loading) {
    return <Spinner />;
  }

  if (!course) {
    return <div className="p-6">Course not found.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p>
          <strong>Description:</strong> {course.description}
        </p>
        <p>
          <strong>Category:</strong> {course.category.name}
        </p>
        <p>
          <strong>Instructor:</strong> {course.instructor.name}
        </p>
        <p>
          <strong>Price:</strong> ₹{course.price}
        </p>
        <p>
          <strong>Status:</strong> {course.status}
        </p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Lectures</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {course.lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Image
                src={lesson.thumbUrl}
                alt={lesson.title}
                width={500}
                height={300}
                className="object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{lesson.title}</h3>
                <p className="text-gray-600">{lesson.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
