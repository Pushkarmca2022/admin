// src/components/CategoryForm.js
import React, { useEffect, useState } from 'react';
import './category.css';
import { getAllCategory, saveCategory, saveProduct } from '../Api';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const navigate=useNavigate()
  const location = useLocation();

  const data = location.state;
  const [id,setId]=useState()
  console.log('data',data)

    const [formData, setFormData] = useState({
        parentCategory: '',
        categoryName: '',
        categoryDescription: '',
        categoryImages: [],
        price: 0,
        stockQuantity: 0,
      });
      const [message, setMessage] = useState('');
  const [categories,setCategories]=useState([])
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
          parentCategory: data?.categoryId?._id || '',
          categoryName: data?.name || '',
          categoryDescription: data?.description || '',
          categoryImages: data.images || [],

         
          price: data.price||0,
          stockQuantity:data?.stockQuantity||  0,
        });
        setId(data._id)
      }
    }, [data]);

     

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
      	

      // console.log(formData)
      // const formDatas = new FormData();
      // formDatas.append('name', formData?.categoryName);
      // formDatas.append('description', formData?.categoryDescription);
      // formDatas.append('image',formData?.categoryImages);
      // formDatas.append('categoryId', formData?.parentCategory);
      // formDatas.append('stockQuantity', formData?.stockQuantity);
      // formDatas.append('price', formData?.price);
     let nomaldata={
      'name': formData?.categoryName,
      'description': formData?.categoryDescription,
      'image': formData?.categoryImages,
      'categoryId': formData?.parentCategory,
      'stockQuantity': formData?.stockQuantity,
      'price': formData?.price

     }
     console.log('nomaldata',nomaldata)


      


       const response = await saveProduct(nomaldata);
    //   setSubmittedData(formData);
      setMessage('Product saved successfully');
      setTimeout(() => {
        navigate('/product')
      },2000);
    } catch (error) {
      setMessage('Error saving Product');
    }
  };
    
  return (
    <div className="container mt-5">
    <div className="form-container">
      <h2 className="text-center">Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="parentCategory" className="form-label">select Category</label>
          <select
            className="form-select"
            id="parentCategory"
            value={formData.parentCategory}
            onChange={handleChange}
          >
            <option value="">Select  category</option>
            {categories.map((item) =>(

<option value={item?._id}>{item?.name}</option>
)
)}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="categoryName" className="form-label">Prodcut Name</label>
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
          <label htmlFor="categoryDescription" className="form-label">Product Description</label>
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
        <div className="mb-3">
          <label htmlFor="categoryName" className="form-label">Price</label>
          <input
            type="text"
            className="form-control"
            id="price"
            placeholder="Enter Product price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categoryName" className="form-label">Stock Quantity</label>
          <input
            type="text"
            className="form-control"
            id="stockQuantity"
            placeholder="Enter Product price"
            value={formData.stockQuantity}
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
