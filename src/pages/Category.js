// src/pages/Product.js
import React, { useEffect, useState } from 'react';
import './product.css'
import { useNavigate } from 'react-router-dom';
import { getAllCategory } from '../Api';
import ActionDropdown from '../components/ActionDropdown';
const Category = () => {
const navigate=useNavigate()
const [categories,setCategories]=useState([])
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
  const handleSelect = (eventKey,data) => {
    console.log(eventKey)
    switch(eventKey) {
      case 'status':
        setCategories(categories?.map(category =>{
            if(category._id==data._id){
                return {...category,status:'InActive'}

            }else{
                return category
            }
        }))
        break;
      case 'edit':
        navigate('/AddCategory',{state:data})
        break;
      case 'delete':
         setCategories(categories?.filter(item=>item._id!==data?._id))
        break;
      default:
        break;
    }
  };
  return(<>
<div class="container-lg">
    <div class="table-responsive">
        <div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-8"><h2>Category <b>Details</b></h2></div>
                    <div class="col-sm-4">
                        <button type="button" class="btn btn-info add-new" onClick={()=>{navigate('/addCategory')}}><i class="fa fa-plus"></i> Add New</button>
                    </div>
                </div>
            </div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>parentCategory</th>
                        <th>Description</th>
                        <th>Status</th>

                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {categories?.map((item)=>{

                    return(
                        <>
                        <tr>
                        <td>{item?.name}</td>
                        <td>{item?.parentId}</td>
                        <td>{item?.description}</td>
                        <td>{item?.status}</td>
                      <td>
                      <ActionDropdown handleSelectevent={(event)=>handleSelect(event,item)}/>
                      </td>
                        
                      
                    </tr> 
                        </>
                    )

                })}
                    {/* <tr>
                        <td>John Doe</td>
                        <td>Administration</td>
                        <td>(171) 555-2222</td>
                        <td>
                            <a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>
                            <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                            <a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>Peter Parker</td>
                        <td>Customer Service</td>
                        <td>(313) 555-5735</td>
                        <td>
                            <a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>
                            <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                            <a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>Fran Wilson</td>
                        <td>Human Resources</td>
                        <td>(503) 555-9931</td>
                        <td>
                            <a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>
                            <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                            <a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>
                        </td>
                    </tr>       */}
                </tbody>
            </table>
        </div>
    </div>
</div>     
  </>
  )
};

export default Category;
