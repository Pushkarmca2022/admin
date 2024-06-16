import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaBell } from 'react-icons/fa';
import './Header.css';

const Header = ({title='Dashboard'}) => {
//   const [currentDate, setCurrentDate] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentDate(new Date());
//     }, 1000);

//     return () => clearInterval(timer); // Cleanup the interval on component unmount
//   }, []);

//   const dayName = currentDate.toLocaleString('default', { weekday: 'long' });
//   const time = currentDate.toLocaleTimeString();

  return (
    <div className="dashboard-header">
    <div className="row align-items-center p-3 ">
      <div className="col-sm-6">
        <h4>{title}</h4>
        {/* <p>{dayName}, {time}</p> */}
      </div>
      <div className="col-sm-6 text-end">
        <div className="d-inline-block me-3">
          <FaUser className="me-2" />
          <span>Rahul kumar</span>
        </div>
        <div className="d-inline-block me-3">
          <FaEnvelope className="me-2" />
          <span>Messages</span>
        </div>
        <div className="d-inline-block">
          <FaBell className="me-2" />
          <span>Notifications</span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Header;
