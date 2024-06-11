// src/api/categoryApi.js
import axios from 'axios';

const API_URL = 'https://your-api-endpoint.com/categories';  // Replace with your API endpoint

export const saveCategory = async (categoryData) => {
  try {
    // const response = await axios.post(API_URL, categoryData);
    return null //response.data;
  } catch (error) {
    console.error('Error saving category data:', error);
    throw error;
  }
};
