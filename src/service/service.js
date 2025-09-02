
import apiCall from "./api";

export const apiService = {
  registerUser: (data) =>
    apiCall("/api/user/register", { method: "POST", data }),

  loginUser: (data) => apiCall("/api/user/login", { method: "POST", data }),

  changePassword: (data) =>
    apiCall("/api/user/changepassword", { method: "POST", data }),

  getLoggedUser: async ({ token }) => {
    try {
      const response = await apiCall("/api/user/loggeduser", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      return response;
    } catch (error) {
      console.error("Error fetching logged user:", error);
      throw error;
    }
  },

  getCourses: async ({ token }) => {
    try {
      const response = await apiCall("/api/course/courses", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      return response;
    } catch (error) {
      console.error("Error fetching courses:", error, token);
      throw error;
    }
  },

  getLessonById: async ({ token, refCourse }) => {
    try {
      const response = await apiCall(`/api/course/getlesson/${refCourse}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      return response;
    } catch (error) {
      console.error("Error fetching lesson:", error);
      throw error;
    }
  },

  createOrder: async ({ token, courseId }) => {
    try {
      const response = await apiCall("/payment/create-order", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId,
        }),
      });

      return response;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  getUsers: async ({ token }) => {
    try {
      const response = await apiCall("/api/user/get-all-users", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      return response;
    } catch (error) {
      console.error("Error fetching users:", error, token);
      throw error;
    }
  },

  getPurchasedCoursesByUser: async (userId, token) => {
    const res = await fetch(`/api/purchases/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json(); // Contains: purchasedCourses[]
  },

  getAllUserCountsPerCourse: async (courseId, token) => {
    console.log("-=-=-=-=-=-=-=-=-=-", courseId);
    try {
      const response = await apiCall(`/api/course/${courseId}/user-count`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      return response;
    } catch (error) {
      console.error("Error fetching users:", error, token);
      throw error;
    }
  },
};
