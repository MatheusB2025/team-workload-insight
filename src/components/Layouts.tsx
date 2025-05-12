
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-app-bg">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-3">
          <h1 className="text-2xl font-bold text-gray-800">Gerenciamento de Sprints</h1>
        </div>
      </header>
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
};

export const TeamLayout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="border-b p-4">
        <h2 className="text-xl font-semibold text-center">Equipe - CIT</h2>
      </div>
      
      <div className="border-b">
        <nav className="flex">
          <Link
            to="/equipe"
            className={`px-6 py-3 font-medium ${
              location.pathname === "/equipe" 
                ? "border-b-2 border-purple text-purple" 
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Equipe
          </Link>
          <Link
            to="/analise"
            className={`px-6 py-3 font-medium ${
              location.pathname.includes("/analise")
                ? "border-b-2 border-purple text-purple" 
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Análise
          </Link>
          <Link
            to="/usuarios"
            className={`px-6 py-3 font-medium ${
              location.pathname === "/usuarios"
                ? "border-b-2 border-purple text-purple" 
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Usuários
          </Link>
        </nav>
      </div>
      
      {children}
    </div>
  );
};
