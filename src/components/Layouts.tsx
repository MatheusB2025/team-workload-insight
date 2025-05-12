
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout, isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen bg-app-bg">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800 border-2 border-gray-800 px-4 py-1 rounded">
              Gerenciamento de Sprints
            </h1>
            
            {isAuthenticated && (
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  {user?.name}
                </span>
                <Button 
                  variant="ghost" 
                  onClick={logout}
                >
                  Sair
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
};

export const TeamLayout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentWeek = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
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
      
      {location.pathname.includes("/analise") && (
        <div className="border-b px-6 py-3 flex justify-between items-center">
          <h2 className="text-lg font-medium">Análise de Tarefas</h2>
          
          <div className="flex items-center gap-2">
            <span className="text-sm">Semana:</span>
            <Select defaultValue="current">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Semana Atual" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Semana Atual</SelectItem>
                <SelectItem value="prev">Semana Anterior</SelectItem>
                <SelectItem value="next">Próxima Semana</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      
      {children}
    </div>
  );
};
