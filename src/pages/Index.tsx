
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  useEffect(() => {
    // Make sure we're using the correct path
    const currentPath = window.location.pathname;
    
    // Only redirect if we're at the exact root path
    if (currentPath === "/" || currentPath === "") {
      console.log("Redirecting from root to ./index.html");
      window.location.href = "./index.html";
    } else {
      console.log("Not redirecting, current path is:", currentPath);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Redirecting...</h1>
        <p className="text-xl text-gray-600 mb-4">
          Please wait while we redirect you to the course.
        </p>
        <Link to="/index.html" className="text-blue-500 hover:underline">
          Click here if you are not redirected
        </Link>
      </div>
    </div>
  );
};

export default Index;
