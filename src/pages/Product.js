// src/pages/Product.js
import React, { useEffect, useState } from 'react';
import './product.css'
import { useNavigate } from 'react-router-dom';
import { getAllProduct } from '../Api';
import ActionDropdown from '../components/ActionDropdown';
import { Pagination, Spin } from 'antd';
import Header from '../components/Header';
import { get30char } from '../Api/function';
import { carousalone} from '../assets';

const Product = () => {
const navigate=useNavigate()
const [products,setProducts]=useState([])
console.log('products',products)

const [loader,setLoader] =useState(false);

const fetchalldata=async()=>{
  
  try{
    setLoader(true)
  let data=await  getAllProduct();
  setProducts(data)
  setLoader(false)
  console.log(data)
  }catch(e){
    console.log(e)
  setLoader(false)

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
{/* <div class="container-lg"> */}
<Header title='Product'/>

    <div class="table-responsive">
        <div class="table-wrapper boderrdish">
            <div class="table-title">
                <div class="row ">
                    {/* <div class="col-sm-8"><h2>Product <b>Details</b></h2></div> */}
                    <div class="col-sm-12 d-flex align-items-end justify-content-end">
                        <button type="button" class="btn btn-info add-new colorteal colorwhite buttiondesign" onClick={()=>{navigate('/addProduct')}}><i class="fa fa-plus"></i> Add New</button>
                    </div>
                </div>
            </div>
      <Spin spinning={loader}>

            <table class="table table-bordered shdow">
                <thead>
                    <tr>
                        <th className='textAlign'>Name</th>
                        <th className='textAlign'>Category</th>
                        <th className='textAlign'>Price</th>
                        <th className='textAlign'>StockQuantity</th>
                        <th className='textAlign'>Description</th>


                        <th className='actionclass'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts?.map((item)=>{

                        return (
                            <>
                             <tr>
                        <td className='textAlign'>

                        <div className='inline-content'>
              <img src={item?.images?.[0] ? item.images[0] : carousalone}  alt="carousalone" className='round-image' />
              {item?.name}
            </div>
                        </td>
                         <td className='textAlign'>{item?.categoryId?.name}</td>
                        <td className='textAlign'>{item?.price}</td>
                        <td className='textAlign'>{item?.stockQuantity}</td>
                        <td className='textAlign'>{get30char(item?.description)}</td>

                        
                        <td className='actionclass'> 
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
{/* </div>      */}
  </>
  )
};

export default Product;
