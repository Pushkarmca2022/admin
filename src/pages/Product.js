// src/pages/Product.js
import React, { useEffect, useState } from 'react';
import './product.css'
import { useNavigate } from 'react-router-dom';
import { getAllProduct } from '../Api';
import ActionDropdown from '../components/ActionDropdown';
import { Pagination } from 'antd';

const Product = () => {
const navigate=useNavigate()
const [products,setProducts]=useState([])
console.log('products',products)

const fetchalldata=async()=>{
  
  try{
  let data=await  getAllProduct();
  setProducts(data)
  console.log(data)
  }catch(e){
    console.log(e)
    setProducts([])

  }

}

  useEffect(()=>{
    fetchalldata();
  

  },[])
  const handleSelect = (eventKey,data) => {
    console.log(eventKey)
    switch(eventKey) {
      case 'status':
        // setCategories(categories?.map(category =>{
        //     if(category._id==data._id){
        //         return {...category,status:'InActive'}

        //     }else{
        //         return category
        //     }
        // }))
        break;
      case 'edit':
        navigate('/AddProduct',{state:data})
        break;
      case 'delete':
        setProducts(products?.filter(item=>item._id!==data?._id))
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
  const currentProducts = products.slice(startIndex, endIndex);
  return(<>
<div class="container-lg">

    <div class="table-responsive">
        <div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-8"><h2>Product <b>Details</b></h2></div>
                    <div class="col-sm-4">
                        <button type="button" class="btn btn-info add-new" onClick={()=>{navigate('/addProduct')}}><i class="fa fa-plus"></i> Add New</button>
                    </div>
                </div>
            </div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>name</th>
                        <th>categoryId</th>
                        <th>price</th>
                        <th>StockQuantity</th>
                        <th>Description</th>


                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts?.map((item)=>{

                        return (
                            <>
                             <tr>
                        <td>{item?.name}</td>
                         <td>{item?.categoryId?.name}</td>
                        <td>{item?.price}</td>
                        <td>{item?.stockQuantity}</td>
                        <td>{item?.description}</td>

                        
                        <td>
                      <ActionDropdown handleSelectevent={(event)=>handleSelect(event,item)}/>
                           
                        </td>
                    </tr>
                            </>
                        )

                    })}
                   
                        
                </tbody>
            </table>
            
            <div className='pagination'>
            <Pagination
        total={products.length}
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
    {/* </Spin> */}
</div>     
  </>
  )
};

export default Product;
