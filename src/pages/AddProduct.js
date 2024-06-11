// src/components/CategoryForm.js
import React, { useState } from 'react';
import './category.css';
import { saveCategory } from '../Api';

const ProductForm = () => {
    const [formData, setFormData] = useState({
        parentCategory: '',
        categoryName: '',
        categoryDescription: '',
        categoryImages: [],
      });
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
      const response = await saveCategory(formData);
    //   setSubmittedData(formData);
      setMessage('Category saved successfully');
    } catch (error) {
      setMessage('Error saving category');
    }
  };
    
  return (
    <div className="container mt-5">
    <div className="form-container">
      <h2 className="text-center">Create Product</h2>
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
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
            <option value="3">Category 3</option>
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

export default ProductForm;
