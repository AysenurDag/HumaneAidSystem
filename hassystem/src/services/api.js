import api from "./instance";

// Example function to get data
export const getData = async (endpoint) => {
  try {
    const response = await api.get(`/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

// Example function to post data
export const postData = async (endpoint, data) => {
  try {
    const response = await api.post(`/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data", error);
    throw error;
  }
};

export const deleteData = async (endpoint) => {
  try {
    const response = await api.delete(`/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting data", error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post("/api/Account/authenticate", {
      email,
      password,
    });
    const token = response.data.data.jwToken;
    if (token) {
      localStorage.setItem("token", token); // Token'ı localStorage'a kaydediyoruz
    }
    return response.data;
  } catch (error) {
    console.error("Error logging in", error);
    throw error;
  }
};

export const register = async (
  firstName,
  lastName,
  username,
  email,
  password,
  confirmPassword,
  phoneNumber
) => {
  try {
    const response = await api.post(`/api/Account/register`, {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      phoneNumber,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering", error.response.data);
    throw error.response.data;
  }
};

export const makeDonation = async (data) => {
  try {
    const response = await api.post(`/api/AidOffer/make-donation`, data);
    return response.data;
  } catch (error) {
    console.error("Error making donation", error.response.data);
    throw error.response.data;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await api.post(`/api/Account/forgot-password`, { email });
    return response.data;
  } catch (error) {
    console.error("Error sending password reset email", error.response.data);
    throw error.response.data;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await api.get(`/api/Product/get-all`);
    console.log("API Response:", response.data); // Log the API response
    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
};

export const addProduct = async (product) => {
  try {
    const response = await api.post(`/api/Product/create`, product);
    return response.data;
  } catch (error) {
    console.error("Error adding product", error);
    throw error;
  }
};

export const removeProduct = async (id) => {
  try {
    const response = await api.delete(`/api/Product/delete?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("Error removing product", error);
    throw error;
  }
};

export const getAllAidPoints = async () => {
  try {
    const response = await api.get(`/api/AidPoint/get-all`);
    return response.data; // Yanıtı doğrudan dönüyoruz
  } catch (error) {
    console.error("Error fetching aid points", error);
    throw error;
  }
};

export const addAidPoint = async (aidPoint) => {
  try {
    const response = await api.post(`/api/AidPoint/add`, aidPoint);
    return response.data;
  } catch (error) {
    console.error("Error adding aid point", error);
    throw error;
  }
};

export const removeAidPoint = async (id) => {
  try {
    const response = await api.delete(`/api/AidPoint/remove/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error removing aid point", error);
    throw error;
  }
};

export const sendAidRequest = async (data) => {
  try {
    const response = await api.post(`/api/AidRequest/add`, data);
    return response.data;
  } catch (error) {
    console.error("Error sending aid request", error);
    throw error;
  }
};

export const searchAidPoints = async (keyword) => {
  try {
    const response = await api.get(`/api/AidPoint/search`, {
      params: { keyword },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching aid points", error);
    throw error;
  }
};

export const getRequestStatuses = async (id) => {
  try {
    const response = await api.get(`/api/AidRequest/update-status/${id}`);
    console.log("API Response:", response.data); // Yanıtı logluyoruz
    return response.data;
  } catch (error) {
    console.error("Error fetching request statuses", error);
    throw error;
  }
};

export const updateAidPoint = async (id, status) => {
  try {
    const response = await api.put(`/api/AidPoint/update-status/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating aid point", error);
    throw error;
  }
};

