import apiCall from "./api";

export const apiService = {
  // ===================== User APIs =====================
  registerUser: (data) =>
    apiCall("/api/user/register", { method: "POST", data }),

  loginUser: (data) => apiCall("/api/user/login", { method: "POST", data }),

  changePassword: (data) =>
    apiCall("/api/user/changepassword", { method: "POST", data }),

  getLoggedUser: ({ token }) =>
    apiCall("/api/user/loggeduser", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }),

  getUsers: ({ token }) =>
    apiCall("/api/user/get-all-users", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }),

  deleteUser: ({ token }) =>
    apiCall("/api/user/delete", {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),

  // ===================== Course APIs =====================
  getCourses: ({ token }) =>
    apiCall("/api/course/courses", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }),

  getLessonById: ({ token, refCourse }) =>
    apiCall(`/api/course/getlesson/${refCourse}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }),

  getAllUserCountsPerCourse: (courseId, token) =>
    apiCall(`/api/course/${courseId}/user-count`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }),

  createCourse: ({ token, formData, onUploadProgress }) =>
    apiCall("/api/course/create-course", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formData,
      onUploadProgress,
    }),

  // ===================== Category & Instructor APIs =====================
  getCategories: () => apiCall("/api/course/categories", { method: "GET" }),

  getInstructors: () => apiCall("/api/course/instructors", { method: "GET" }),

  // ===================== Payment APIs =====================
  createOrder: ({ token, courseId }) =>
    apiCall("/payment/create-order", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ courseId }),
    }),

  // ===================== Purchases =====================
  getPurchasedCoursesByUser: (userId, token) =>
    apiCall(`/api/purchases/user/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }),
};
