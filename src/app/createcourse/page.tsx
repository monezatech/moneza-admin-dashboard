"use client";

import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SearchableSelect from "../../components/searchableDropdown";
import ProgressBar from "../../components/ProgressBar";

const courseSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  categoryId: yup.string().required("Category is required"),
  instructorId: yup.string().required("Instructor is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required"),
  thumbnail: yup
    .mixed()
    .test(
      "required",
      "Thumbnail is required",
      (value) => value && value.length > 0
    ),
  lessons: yup
    .array()
    .of(
      yup.object().shape({
        title: yup.string().required("Lesson title is required"),
        content: yup.string().required("Lesson content is required"),
        duration: yup.string().required("Duration is required"),
        video: yup
          .mixed()
          .test(
            "required",
            "Video is required",
            (value) => value && value.length > 0
          ),
      })
    )
    .min(1, "At least one lesson is required"),
});

export default function CreateCoursePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, instRes] = await Promise.all([
          axios.get("http://localhost:8000/api/course/categories"),
          axios.get("http://localhost:8000/api/instructors"),
        ]);
        setCategories(catRes.data);
        setInstructors(instRes.data);
      } catch (err) {
        console.error("Failed to load categories or instructors", err);
      }
    }
    fetchData();
  }, []);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
      instructorId: "",
      price: "",
      thumbnail: null,
      lessons: [{ title: "", content: "", duration: "", video: null }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "lessons",
  });

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("categoryId", data.categoryId);
      formData.append("instructorId", data.instructorId);
      formData.append("price", data.price);
      formData.append("thumbnail", data.thumbnail[0]);

      // Prepare lessons metadata without video
      const lessonsToSend = data.lessons.map((lesson: any) => ({
        title: lesson.title,
        content: lesson.content,
        duration: lesson.duration,
      }));
      formData.append("lessons", JSON.stringify(lessonsToSend));

      // Append videos (one per lesson)
      data.lessons.forEach((lesson: any, index: number) => {
        if (lesson.video && lesson.video.length > 0) {
          formData.append("videos", lesson.video[0]); // "videos[]" if your backend expects array
        }
      });

      await axios.post(
        "http://localhost:8000/api/course/create-course",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (event) => {
            const percent = Math.round(
              (event.loaded * 100) / (event.total || 1)
            );
            setUploadProgress(percent);
          },
        }
      );

      setMessage("✅ Course created successfully!");
      setUploadProgress(0);
      setThumbnailPreview(null);
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to create course");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Create Course</h2>

      {message && (
        <div className="mb-4 px-4 py-2 bg-blue-100 text-blue-800 rounded">
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white p-6 rounded shadow"
      >
        <div>
          <label className="block font-medium">Title</label>
          <input {...register("title")} className="input" />
          <p className="error">{errors.title?.message}</p>
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea {...register("description")} className="input" />
          <p className="error">{errors.description?.message}</p>
        </div>

        {/* Thumbnail Upload */}
        <div>
          <label className="block font-medium mb-1">Thumbnail</label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              {...register("thumbnail")}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setThumbnailPreview(URL.createObjectURL(file));
              }}
              className="hidden"
              id="thumbnailInput"
            />
            <label
              htmlFor="thumbnailInput"
              className="cursor-pointer bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              Upload Image
            </label>
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded border"
              />
            )}
          </div>
          <p className="error">{errors.thumbnail?.message}</p>
        </div>

        {/* Category & Instructor */}
        <div className="grid grid-cols-2 gap-4">
          <SearchableSelect
            label="Category"
            options={categories.map((cat) => ({
              label: cat.name,
              value: cat._id,
            }))}
            value={watch("categoryId")}
            onChange={(val) => setValue("categoryId", val)}
          />

          <SearchableSelect
            label="Instructor"
            options={instructors.map((inst) => ({
              label: inst.name,
              value: inst._id,
            }))}
            value={watch("instructorId")}
            onChange={(val) => setValue("instructorId", val)}
          />

          <div>
            <label className="block font-medium">Price</label>
            <input type="number" {...register("price")} className="input" />
            <p className="error">{errors.price?.message}</p>
          </div>
        </div>

        {/* Lessons Section */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold">Lessons</h3>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border p-4 rounded my-4 bg-gray-50 space-y-3"
            >
              <input
                {...register(`lessons.${index}.title`)}
                placeholder="Lesson Title"
                className="input"
              />
              <p className="error">
                {errors?.lessons?.[index]?.title?.message}
              </p>

              <textarea
                {...register(`lessons.${index}.content`)}
                placeholder="Lesson Content"
                className="input"
              />
              <p className="error">
                {errors?.lessons?.[index]?.content?.message}
              </p>

              <input
                {...register(`lessons.${index}.duration`)}
                placeholder="Duration"
                className="input"
              />
              <p className="error">
                {errors?.lessons?.[index]?.duration?.message}
              </p>

              <input
                type="file"
                accept="video/*"
                {...register(`lessons.${index}.video`)}
                className="input"
              />
              <p className="error">
                {errors?.lessons?.[index]?.video?.message}
              </p>

              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 text-sm"
              >
                Remove Lesson
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              append({ title: "", content: "", duration: "", video: null })
            }
            className="mt-2 text-blue-600 underline"
          >
            + Add Lesson
          </button>
        </div>

        {/* Upload Progress */}
        {isSubmitting && <ProgressBar percent={uploadProgress} />}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {isSubmitting ? "Submitting..." : "Create Course"}
        </button>
      </form>

      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid #ccc;
          padding: 0.5rem;
          border-radius: 0.25rem;
        }
        .error {
          color: #dc2626;
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}
