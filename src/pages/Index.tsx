
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  useEffect(() => {
    // Redirigir al HTML
    window.location.href = "./index.html";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Redirigiendo...</h1>
        <p className="text-xl text-gray-600 mb-4">
          Por favor espera un momento mientras te redirigimos.
        </p>
        <Link to="/" className="text-blue-500 hover:underline">
          Haz clic aquí si no eres redirigido
        </Link>
      </div>
    </div>
  );
};

export default Index;
