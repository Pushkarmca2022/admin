
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaTachometerAlt, FaUser, FaBox } from 'react-icons/fa';
// import './Sidebar.css';  

// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <ul>
//         <li>
//           <Link to="/dashboard">
//             <FaTachometerAlt className="icon" />
//             <span>Dashboard</span>
//           </Link>
//         </li>
//         <li>
//           <Link to="/category">
//             <FaBox className="icon" />
//             <span>Category</span>
//           </Link>
//         </li>
//         <li>
//           <Link to="/product">
//             <FaBox className="icon" />
//             <span>Product</span>
//           </Link>
//         </li>
//         <li>
//           <Link to="/user">
//             <FaUser className="icon" />
//             <span>User</span>
//           </Link>
//         </li>
      
       
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaBox } from 'react-icons/fa';
import './Sidebar.css';  

const Sidebar = () => {
  const location = useLocation();
  const [isDashboardRoute, setIsDashboardRoute] = useState(false);

  useEffect(() => {
    setIsDashboardRoute(location.pathname === '/dashboard');
  }, [location]);
  return (
    <div className={isDashboardRoute ? 'sidebar shdow addheight ' : 'sidebar shdow'} >
      <h1 className="sidebar-heading ">Zetop</h1>
      <ul>
        <li>
          <NavLink to="/dashboard" activeClassName="active">
            <FaTachometerAlt className="icon" />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/category" activeClassName="active">
            <FaBox className="icon" />
            <span>Category</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/product" activeClassName="active">
            <FaBox className="icon" />
            <span>Product</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/user" activeClassName="active">
            <FaUser className="icon" />
            <span>User</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;


