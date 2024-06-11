// src/api/categoryApi.js
import axios from 'axios';

const API_URL = 'http://localhost:9000/api/v1'; 
// const API_URL ='https://zepto-backends.onrender.com/api/v1'

export const saveCategory = async (categoryData) => {
  try {
    //  const response = await axios.post(`${API_URL}/cat`, categoryData);
     const response = await axios.post(`${API_URL}/categories`, categoryData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return null //response.data;
  } catch (error) {
    console.error('Error saving category data:', error);
    throw error;
  }
};
export const getAllCategory = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
   return response?.data
  
  } catch (err) {
      // return err
      throw err;

  }
};
