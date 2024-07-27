// src/api/categoryApi.js
import axios from 'axios';

const API_URL = 'http://localhost:9000/api/v1'; 
// const API_URL ='https://zepto-backends.onrender.com/api/v1'
export const fetchData = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
   return response?.data
  //   setLoading(false);
  } catch (err) {
      return err
  //   setError(err);
  //   setLoading(false);
  }
};

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
export const deleteCategory=async (id)=>{
  try{
  const response = await axios.delete(`${API_URL}/categories/${id}`);
    return response?.data
  }catch(e){
    console.log('errr',e)
    return
    
  }

}
export const updateCategoryStatus=async(id,data)=>{
  try{
    let data1={status:data}
    const response=await axios.put(`${API_URL}/categories/${id}/status`,data1)
    return response?.data
  }catch(e){
    console.log('error',e)
    return ;
  }
}

export const getAllUsers=async()=>{
  try{
    const response = await axios.get(`${API_URL}/user`)
    return response?.data
  }catch (err) {
    console.log(err)
  }
}




export const saveProduct = async (productData) => {
  try {
    //  const response = await axios.post(`${API_URL}/cat`, categoryData);
     const response = await axios.post(`${API_URL}/products`, productData, {
      headers: {
        // 'Content-Type': 'application/json'
        'Content-Type': 'multipart/form-data'

      }
    });
    return null //response.data;
  } catch (error) {
    console.error('Error saving category data:', error);
    throw error;
  }
};
export const getAllProduct = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
   return response?.data
  
  } catch (err) {
      // return err
      throw err;

  }
};
export const deleteProduct=async (id)=>{
  try{
  const response = await axios.delete(`${API_URL}/products/${id}`);
    return response?.data
  }catch(e){
    console.log('errr',e)
    return
    
  }

}
