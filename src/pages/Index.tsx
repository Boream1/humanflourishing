
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  useEffect(() => {
    // Check if we're at the root path and ensure proper navigation
    const currentPath = window.location.pathname;
    
    // Only redirect if we're at the exact root path
    if (currentPath === "/" || currentPath === "") {
      console.log("At root path, no redirect needed");
      // We'll handle navigation with React Router instead of hard redirect
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to IE University Course</h1>
        <p className="text-xl text-gray-600 mb-6">
          Please select a chapter below to begin your learning journey.
        </p>
        <div className="grid gap-4 mt-6">
          <Link 
            to="/chapter1.html" 
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Chapter 1: Being Human
          </Link>
          <Link 
            to="/chapter2.html" 
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Chapter 2
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
