
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  useEffect(() => {
    // Redirect to the HTML version
    window.location.href = "./index.html";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Redirecting...</h1>
        <p className="text-xl text-gray-600 mb-4">
          Please wait while we redirect you to the course.
        </p>
        <Link to="/" className="text-blue-500 hover:underline">
          Click here if you are not redirected
        </Link>
      </div>
    </div>
  );
};

export default Index;
