// src/pages/User.js
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getAllUsers } from '../Api';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { carousalone} from '../assets';
import ActionDropdown from '../components/ActionDropdown';


const User = () => {
  const navigate=useNavigate()
const [users,setUsers]=useState([])
const [loader,setLoader] =useState(false);

const fetchalldata=async()=>{
  
  try{
    setLoader(true)
  let data=await  getAllUsers();
  setUsers(data)
  setLoader(false)
  }catch(e){
    console.log(e)
  setLoader(false)

  setUsers([])

  }

}

  useEffect(()=>{
    fetchalldata();
  

  },[])
  const handleSelect = (eventKey,data) => {
    console.log(eventKey)
    switch(eventKey) {
      case 'status':
      
        break;
      case 'edit':
      //  navigate('/AddCategory',{state:data})
        break;
      case 'delete':
       //  setCategories(categories?.filter(item=>item._id!==data?._id))
        break;
      default:
        break;
    }
  };
  function getHumanReadableDateTime(isoDateString) {
    let dateObj = new Date(isoDateString);

    // Formatting options for date
    let dateFormatOptions = {
        year: 'numeric', month: 'short', day: 'numeric'
    };

    // Formatting options for time
    let timeFormatOptions = {
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false  // Use 24-hour format
    };

    // Convert to human-readable date and time
    let humanReadableDate = dateObj.toLocaleDateString('en-US', dateFormatOptions);
    let humanReadableTime = dateObj.toLocaleTimeString('en-US', timeFormatOptions);

    return `${humanReadableDate}, ${humanReadableTime}`;
}
  return (
    <>
    <div class="container-lg">
    <Header title='User'/>
    <div class="table-responsive">
        <div class="table-wrapper boderrdish">
           
            <Spin spinning={loader}>
            <table class="table table-bordered shdow ">
                <thead>
                    <tr>
                        <th className='textAlign'>Email</th>
                        <th className='textAlign'>
                          Role</th>
                        <th className='textAlign'>CreateAt</th>
                       
                        <th className='actionclass'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {users?.map((item)=>{

                    return(
                        <>
                        <tr>
                        <td>
            <div className='inline-content'>
              <img src={ carousalone}  alt="carousalone" className='round-image' />
              {item?.email}
            </div>
          </td>
          <td className='center-content'>{item?.role}</td>
          <td className='center-content'>{getHumanReadableDateTime(item?.dateJoined)}</td>
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
            {/* <Pagination
        total={categories.length}
        showTotal={(total) => `Total ${total} items`}
        defaultPageSize={10}
        defaultCurrent={1}
        current={currentPage}
        pageSize={pageSize}
        onChange={handlePageChange}
      /> */}
            </div>
        </div>
    </div>
    </div>
    </>
  );
};

export default User;
