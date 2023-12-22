// Sidebar.js
import React, { useState } from "react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside
      className={`bg-gray-800 text-white p-4 ${collapsed ? "w-16" : "w-64"}`}
    >
      {/* Sidebar content goes here */}
      <div className="mb-4">Logo or Sidebar Header</div>
      <nav>
        <ul>
          <li className="mb-2">
            <a href="/dashboard" className="hover:text-gray-300">
              Dashboard
            </a>
          </li>
          <li className="mb-2">
            <a href="/profile" className="hover:text-gray-300">
              Profile
            </a>
          </li>
          {/* Add more sidebar links as needed */}
        </ul>
      </nav>
      <button
        className="mt-4 text-white hover:text-gray-300 focus:outline-none"
        onClick={toggleSidebar}
      >
        {collapsed ? "»" : "«"}
      </button>
    </aside>
  );
};

export default Sidebar;
