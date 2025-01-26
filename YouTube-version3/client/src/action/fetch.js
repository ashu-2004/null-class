import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("Profile")).token}`;
  }
  return req;
});

// Fetch watched videos
export const fetchWatchedVideos = (userId) => async (dispatch) => {
  try {
    const { data } = await API.get(`/videos/watched/${userId}`);
    dispatch({ type: "FETCH_WATCHED_VIDEOS", payload: data });
  } catch (error) {
    console.error("Error fetching watched videos:", error);
  }
};

// Fetch user points
export const getUserPoints = async (userId) => {
  try {
    return await API.get(`/user/points/${userId}`);
  } catch (error) {
    console.error("Error fetching user points:", error);
    throw error;
  }
};
