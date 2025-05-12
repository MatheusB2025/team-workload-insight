
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to team page
    navigate("/equipe");
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-app-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Carregando...</h1>
      </div>
    </div>
  );
};

export default Index;
