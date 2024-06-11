// src/components/CategoryForm.js
import React, { useEffect, useState } from 'react';
import './category.css';
import { getAllCategory, saveCategory } from '../Api';
import { useLocation, useNavigate } from 'react-router-dom';

const CategoryForm = () => {
  const navigate=useNavigate()
  const location = useLocation();
  const data = location.state;
 
  const [categories,setCategories]=useState([])
  const [id,setId]=useState()
  const [formData, setFormData] = useState({
    parentCategory: '',
    categoryName: '',
    categoryDescription: '',
    categoryImages: [],
  });
  console.log('categories',categories)

  const fetchalldata=async()=>{
    
    try{
    let data=await  getAllCategory();
    setCategories(data)
    console.log(data)
    }catch(e){
      console.log(e)
      setCategories([])

    }
  
  }

    useEffect(()=>{
      fetchalldata();
    
  
    },[])
    useEffect(() => {
      if (data) {
        setFormData({
          parentCategory: data.parentId || '',
          categoryName: data.name || '',
          categoryDescription: data.description || '',
          categoryImages: data.images || [],
        });
        setId(data._id)
      }
    }, [data]);


   
      const [message, setMessage] = useState('');
     

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === 'categoryImages') {
      setFormData({
        ...formData,
        categoryImages: files,
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
 


      const formDatas = new FormData();
      formDatas.append('name', formData?.categoryName);
      formDatas.append('description', formData?.categoryDescription);
      formDatas.append('image',formData?.categoryImages);
      formDatas.append('parentId', formData?.parentCategory);
      const response = await saveCategory(formDatas);

      setMessage('Category saved successfully');
      setTimeout(() => {
        navigate('/category')
      },3000);
    } catch (error) {
      setMessage('Error saving category');
    }
  };
    
  return (
    <div className="container mt-5">
    <div className="form-container">
      <h2 className="text-center">{id?'Update Category':'Create Category'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="parentCategory" className="form-label">Parent Category</label>
          <select
            className="form-select"
            id="parentCategory"
            value={formData.parentCategory}
            onChange={handleChange}
          >
            <option value="">Select parent category</option>
            {categories.map((item) =>(

              <option value={item?._id}>{item?.name}</option>
            )
            )}
         
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="categoryName" className="form-label">Category Name</label>
          <input
            type="text"
            className="form-control"
            id="categoryName"
            placeholder="Enter category name"
            value={formData.categoryName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="categoryDescription" className="form-label">Category Description</label>
          <textarea
            className="form-control"
            id="categoryDescription"
            rows="3"
            placeholder="Enter category description"
            value={formData.categoryDescription}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="categoryImages" className="form-label">Images</label>
          <input
            className="form-control"
            type="file"
            id="categoryImages"
            multiple
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
      {message && (
          <div className="mt-3 alert alert-info">
            {message}
          </div>
        )}

  
    </div>
  </div>
  );
};

export default CategoryForm;
