// src/components/CategoryForm.js
import React, { useEffect, useState } from 'react';
import './category.css';
import { getAllCategory,  saveProduct } from '../Api';
import { useLocation, useNavigate } from 'react-router-dom';
import { Image, Upload,Spin } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

const ProductForm = () => {
  const navigate=useNavigate()
  const location = useLocation();

  const data = location.state;
  const [id,setId]=useState()
  const [loader,setLoader] =useState(false);
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
  const [fileList, setFileList] = useState([
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
   
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true)
      	

      // console.log(formData)
      const formDatas = new FormData();
      formDatas.append('name', formData?.categoryName);
      formDatas.append('description', formData?.categoryDescription);
      formDatas.append('image',fileList[0]?.originFileObj);
      formDatas.append('categoryId', formData?.parentCategory);
      formDatas.append('stockQuantity', formData?.stockQuantity);
      formDatas.append('price', formData?.price);
    //  let nomaldata={
    //   'name': formData?.categoryName,
    //   'description': formData?.categoryDescription,
    //   'image': formData?.categoryImages,
    //   'categoryId': formData?.parentCategory,
    //   'stockQuantity': formData?.stockQuantity,
    //   'price': formData?.price

    //  }
    


      


       const response = await saveProduct(formDatas);
    //   setSubmittedData(formData);
    setLoader(false)

      setMessage('Product saved successfully');
      setTimeout(() => {
        navigate('/product')
      },2000);
    } catch (error) {
      setLoader(false)

      setMessage('Error saving Product');
    }
  };
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
 
  // const handlePreview = async (file) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }
  //   setPreviewImage(file.url || file.preview);
  //   setPreviewOpen(true);
  // };
  console.log('fileList',fileList)
  const handleChanges = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
    
  return (
    <div className="container mt-5">
    <div className="form-container boderrdish">
      <h2 className="text-center">Create Product</h2>
<Spin spinning={loader}>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="parentCategory" className="form-label textdesign">select Category</label>
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
          <label htmlFor="categoryDescription" className="form-label textdesign">Product Description</label>
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
          <label htmlFor="categoryName" className="form-label textdesign">Price</label>
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
          <label htmlFor="categoryName" className="form-label textdesign">Stock Quantity</label>
          <input
            type="text"
            className="form-control"
            id="stockQuantity"
            placeholder="Enter Product price"
            value={formData.stockQuantity}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categoryImages" className="form-label textdesign">Images</label>
          
          <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={fileList}
        onPreview={()=>{}}
        onChange={handleChanges}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none',
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
        </div>
        


<button type="submit" className="btn btn-primary w-100 colorteal">Submit</button>
      </form>
      </Spin>
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
