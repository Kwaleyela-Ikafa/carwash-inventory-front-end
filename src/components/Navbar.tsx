import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a className="text-white text-2xl font-bold" href="/">OneStop</a>
        <div className="space-x-4">
          <a className="text-white hover:underline" href="/">Dashboard</a>
          <a className="text-white hover:underline" href="/library">Library</a>
          <a className="text-white hover:underline" href="/form">Form</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
