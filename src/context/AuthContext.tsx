
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "reader";
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  requestPasswordReset: (email: string) => void;
  resetPassword: (email: string, tempPassword: string, newPassword: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string, password: string) => {
    // In a real app, this would validate against a backend
    if (email.includes("@") && password.length >= 6) {
      const newUser = {
        id: "1",
        name: email.split("@")[0],
        email: email,
        role: "admin" as const,
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      toast({
        title: "Login realizado",
        description: "Bem-vindo ao sistema de Gerenciamento de Sprints",
      });
      
      navigate("/equipe");
    } else {
      toast({
        title: "Erro",
        description: "Email ou senha inválidos",
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    navigate("/login");
    
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    });
  };

  const requestPasswordReset = (email: string) => {
    // In a real app, this would send an email with a temporary password
    if (email.includes("@")) {
      const tempPassword = Math.random().toString(36).slice(-8);
      localStorage.setItem("tempPassword", tempPassword);
      localStorage.setItem("resetEmail", email);
      
      toast({
        title: "Recuperação de senha",
        description: `Uma senha temporária foi enviada para ${email}. Para fins de demonstração, a senha é: ${tempPassword}`,
      });
      
      navigate("/reset-password");
    } else {
      toast({
        title: "Erro",
        description: "Email inválido",
        variant: "destructive",
      });
    }
  };

  const resetPassword = (email: string, tempPassword: string, newPassword: string) => {
    const storedEmail = localStorage.getItem("resetEmail");
    const storedTempPassword = localStorage.getItem("tempPassword");
    
    if (email === storedEmail && tempPassword === storedTempPassword) {
      localStorage.removeItem("tempPassword");
      localStorage.removeItem("resetEmail");
      
      toast({
        title: "Senha redefinida",
        description: "Sua senha foi redefinida com sucesso. Faça login com sua nova senha.",
      });
      
      navigate("/login");
    } else {
      toast({
        title: "Erro",
        description: "Dados inválidos para redefinição de senha",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        requestPasswordReset,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
