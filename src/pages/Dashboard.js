// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import './dashboard.css'
import { fetchData } from '../Api';
import { FaUser, FaEnvelope, FaBell } from 'react-icons/fa';
import Header from '../components/Header';
const Dashboard = () => {
  const [data,setData]=useState({})
const fetchalldata=async()=>{
  try{
  let data=await  fetchData();
  setData(data?.counts)
  console.log(data)
  }catch(e){
    console.log(e)
    setData({})
  }

}
  useEffect(()=>{
    fetchalldata();
  

  },[])
  return(<>
<div className="container bootstrap snippets bootdey">
<Header/>
  {/* <div className="row">
    <div className='col-sm-6'>

<p>Dashboard</p>
    </div>
    <div className='col-sm-6'>

       <p>Username</p>
    </div>

  </div> */}
  <div className="row ">
    <div className="col-lg-3 col-lg-custome m-1 col-sm-6 clorebackwhite circle-tile-content shdow">
      <div className="circle-tile ">
        <a href="#"><div className="circle-tile-heading dark-blue"><i className="fa fa-users fa-fw fa-3x"></i></div></a>
        <div className="circle-tile-content dark-blue">
          <div className="circle-tile-description text-faded"> Users</div>
          <div className="circle-tile-number text-faded ">{data?.users}</div>
        </div>
      </div>
    </div>
     
    <div className="col-lg-3 col-lg-custome col-sm-6 clorebackwhite  circle-tile-content shdow">
      <div className="circle-tile  ">
        <a href="#"><div className="circle-tile-heading red"><i class="fa-brands fa-product-hunt fa-3x"></i></div></a>
        <div className="circle-tile-content red">
          <div className="circle-tile-description text-faded"> Product </div>
          <div className="circle-tile-number text-faded ">{data?.products}</div>
        </div>
      </div>
    </div> 
     
    <div className="col-lg-3 col-lg-custome col-sm-6 circle-tile-content clorebackwhite shdow">
      <div className="circle-tile ">
        <a href="#"><div className="circle-tile-heading yellow "><i className="fa-light fa-table  fa-3x"></i></div></a>
        <div className="circle-tile-content yellow">
          <div className="circle-tile-description text-faded"> Category </div>
          <div className="circle-tile-number text-faded ">{data?.categories}</div>
        </div>
      </div>
    </div> 
     
    <div className="col-lg-3 col-lg-custome col-sm-6 circle-tile-content  clorebackwhite shdow">
      <div className="circle-tile ">
        <a href="#"><div className="circle-tile-heading orange"><i className="fa fa-comments fa-fw fa-3x"></i></div></a>
        <div className="circle-tile-content orange">
          <div className="circle-tile-description text-faded"> transaction </div>
          <div className="circle-tile-number text-faded ">10</div>
        </div>
      </div>
    </div> 
  </div> 
</div>  

  </>)
};

export default Dashboard;
