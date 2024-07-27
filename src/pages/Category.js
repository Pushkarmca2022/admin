// src/pages/Product.js
import React, { useEffect, useState } from 'react';
import './category.css'
import { useNavigate } from 'react-router-dom';
import { deleteCategory, getAllCategory, updateCategoryStatus } from '../Api';
import { carousalone} from '../assets';

import ActionDropdown from '../components/ActionDropdown';
import { Pagination } from 'antd';
import { Spin } from 'antd';
import Header from '../components/Header';
import { get30char } from '../Api/function';

const Category = () => {
const navigate=useNavigate()
const [categories,setCategories]=useState([])
console.log('categories',categories)
const [loader,setLoader] =useState(false);

const fetchalldata=async()=>{
  
  try{
    setLoader(true)
  let data=await  getAllCategory();
  setCategories(data)
  setLoader(false)
  }catch(e){
    console.log(e)
  setLoader(false)

    setCategories([])

  }

}

  useEffect(()=>{
    fetchalldata();
  

  },[])
  const handleSelect = async(eventKey,data) => {
    console.log(eventKey)
    switch(eventKey) {
      case 'status':
        let statusupdate=data?.status=='active'?'inactive':'active'
        updateCategoryStatus(data._id,statusupdate)
        setCategories(categories?.map(category =>{
            if(category._id==data._id){
                return {...category,status:statusupdate}

            }else{
                return category
            }
        }))
        break;
      case 'edit':
        navigate('/AddCategory',{state:data})
        break;
      case 'delete':
           await deleteCategory(data?._id)
         setCategories(categories?.filter(item=>item._id!==data?._id))
        break;
      default:
        break;
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentCategories = categories.slice(startIndex, endIndex);
  return(<>
<div class="container">
<Header title='Category'/>

    <div class="table-responsive">
        <div class="table-wrapper boderrdish">
            <div class="table-title">
                <div class="row ">
                    {/* <div class="col-sm-8"><h2>Category <b>Details</b></h2></div> */}
                    <div class="col-sm-12 d-flex align-items-end justify-content-end ">
                        <button type="button" class="btn btn-info add-new colorteal colorwhite buttiondesign" onClick={()=>{navigate('/addCategory')}}><i class="fa fa-plus"></i> Add New</button>
                    </div>
                </div>
            </div>
            <Spin spinning={loader}>
            <table class="table table-bordered shdow ">
                <thead>
                    <tr>
                        <th className='textAlign'>Name</th>
                        <th className='textAlign'>
                          ParentCategory</th>
                        <th className='textAlign'>Description</th>
                        <th className='textAlign' style={{ width: '100px' }}>Status</th>
                       
                        <th className='actionclass'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {currentCategories?.map((item)=>{

                    return(
                        <>
                        <tr>
                        <td>
            <div className='inline-content'>
              <img src={item?.images?.[0] ? item.images[0] : carousalone}  alt="carousalone" className='round-image' />
              {item?.name}
            </div>
          </td>
          <td className='center-content'>{categories.filter((items)=>items?._id=== item?.parentId)[0]?.name}</td>
          <td className='center-content'>{get30char(item?.description)}</td>
          <td className='center-content'>{item?.status}</td>
                      <td className='center-content'>
                      <ActionDropdown handleSelectevent={(event)=>handleSelect(event,item)}/>
                      </td>
                        
                      
                    </tr> 
                        </>
                    )

                })}
                  
                </tbody>
            </table>
            </Spin>
            <div className='pagination'>
            <Pagination
        total={categories.length}
        showTotal={(total) => `Total ${total} items`}
        defaultPageSize={10}
        defaultCurrent={1}
        current={currentPage}
        pageSize={pageSize}
        onChange={handlePageChange}
      />
            </div>
        </div>
    </div>
</div>     
  </>
  )
};

export default Category;
