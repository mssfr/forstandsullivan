// let api='http://localhost:5000'
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Set your base URL
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    console.log(error,error.response?.data?.message)
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post('/login', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const GetallBlog = async () => {
  try {
    const response = await api.get('/blogs');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
export const Createpost = async (token, title, description) => {
  console.log(token, title, description);
  try {
    const response = await api.post('/createblog', { token, title, description });
    console.log(response.data);

    return response.data ;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Create blog failed");
  }
};

export const GetalluserBlog = async (token) => {
  try {
    const response = await api.get("/userblogs", {
      headers: {
        Authorization: `Bearer ${token}` // Send the token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
