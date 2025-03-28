import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Redirect to auth server for login
export const login = () => {
  window.location.href = `http://localhost:5000/login?redirect=${encodeURIComponent(window.location.href)}`;
};

// Logout (clears cookie)
export const logout = async () => {
  await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
  window.location.href = "/login";
};

// Check if user is authenticated
export const isAuthenticated = async () => {
  try {
    const res = await axios.get(`${API_URL}/validate`, { withCredentials: true });
    return res.data.valid;
  } catch (err) {
    return false;
  }
};