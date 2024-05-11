import React from "react";

function Sidebar() {
  return (
    <div className="h-full w-64 bg-gray-800 text-white fixed top-0 left-0">
      <div className="p-5">Logo or Title</div>
      <ul className="space-y-2">
        <li>
          <a href="#" className="block p-4 hover:bg-gray-700 transition-colors">
            Dashboard
          </a>
        </li>
        <li>
          <a href="#" className="block p-4 hover:bg-gray-700 transition-colors">
            Profile
          </a>
        </li>
        <li>
          <a href="#" className="block p-4 hover:bg-gray-700 transition-colors">
            Settings
          </a>
        </li>
        <li>
          <a href="#" className="block p-4 hover:bg-gray-700 transition-colors">
            Help
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
