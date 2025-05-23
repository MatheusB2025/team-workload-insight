import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-gray-600 font-normal">
                    {user?.name}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={logout}
                >
                  <LogOut className="mr-1 h-4 w-4" /> Sair
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
  const navigate = useNavigate();
  const { logout } = useAuth();
  const currentWeek = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="border-b">
        <nav className="flex p-2 bg-gray-50 rounded-t-lg shadow-sm">
          <div className="flex-1 flex rounded-md border-2 border-purple-300 shadow-sm overflow-hidden">
            <Link
              to="/equipe"
              className={`px-6 py-3 font-normal transition-colors ${
                location.pathname === "/equipe" 
                  ? "bg-purple text-white" 
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              }`}
            >
              Equipe
            </Link>
            <Link
              to="/analise"
              className={`px-6 py-3 font-normal transition-colors ${
                location.pathname.includes("/analise")
                  ? "bg-purple text-white" 
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              }`}
            >
              Análise
            </Link>
            <Link
              to="/usuarios"
              className={`px-6 py-3 font-normal transition-colors ${
                location.pathname === "/usuarios"
                  ? "bg-purple text-white" 
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              }`}
            >
              Usuários
            </Link>
          </div>
          
          <Button 
            variant="outline" 
            className="ml-4"
            onClick={handleLogout}
          >
            <LogOut className="mr-1 h-4 w-4" /> Testar Login
          </Button>
        </nav>
      </div>
      
      {location.pathname.includes("/analise") && (
        <div className="border-b px-6 py-3 flex justify-between items-center">
          <h2 className="text-lg font-normal">Análise de Tarefas</h2>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-normal">Semana:</span>
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
