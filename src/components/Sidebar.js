// // src/components/Sidebar.js
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <ul>
//         <li><Link to="/dashboard">Dashboard</Link></li>
//         <li><Link to="/user">User</Link></li>
//         <li><Link to="/product">Product</Link></li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaBox } from 'react-icons/fa';
import './Sidebar.css';  // Add a separate CSS file for sidebar styling

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/dashboard">
            <FaTachometerAlt className="icon" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/category">
            <FaBox className="icon" />
            <span>Category</span>
          </Link>
        </li>
        <li>
          <Link to="/product">
            <FaBox className="icon" />
            <span>Product</span>
          </Link>
        </li>
        <li>
          <Link to="/user">
            <FaUser className="icon" />
            <span>User</span>
          </Link>
        </li>
      
       
      </ul>
    </div>
  );
};

export default Sidebar;

