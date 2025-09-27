import axios from "axios";

// const BASE_URL = "http://172.20.10.5:8000"; // mobile
// const BASE_URL = "http://192.168.1.50:8000";
const BASE_URL = "https://moneza-backend.onrender.com";

const apiCall = async (endpoint, options = {}) => {
  const {
    method = "GET",
    data = null,
    params = {},
    headers = {},
    token = null,
    onUploadProgress = () => {},
  } = options;

  const apiHeaders = {
    Accept: "application/json",
    ...headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  if (!(data instanceof FormData)) {
    apiHeaders["Content-Type"] = "application/json";
  }

  try {
    const response = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params,
      timeout: 10000,
      headers: apiHeaders,
      onUploadProgress,
    });
    return response.data;
  } catch (error) {
    console.error("API Call Error:", error.message);

    if (error.response) {
      console.error("Response Data:", error.response.data);
      console.error("Status Code:", error.response.status);
      console.error("Headers:", error.response.headers);
      throw error.response.data;
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("No response received from the server.");
    } else {
      console.error("Error Message:", error.message);
      throw new Error("Error in setting up the request.");
    }
  }
};

export default apiCall;
