
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("cadastro");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    
    // In a real app, we would call a register function here
    // For now, let's simulate a successful registration
    localStorage.setItem("user", JSON.stringify({
      id: "1",
      name,
      email,
      role: "admin",
    }));
    
    login(email, password);
    navigate("/equipe");
  };

  const validateEmail = (value: string) => {
    if (value && !value.endsWith("@fraga.com.br")) {
      const username = value.split('@')[0] || value;
      return `${username}@fraga.com.br`;
    }
    return value;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validEmail = validateEmail(e.target.value);
    setEmail(validEmail);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-app-bg">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-red-600">
            Planejamento de Sprint
          </CardTitle>
          <CardDescription className="text-center">
            Faça login ou cadastre-se para continuar
          </CardDescription>
        </CardHeader>
        
        <div className="flex w-full border-b mb-4">
          <Link
            to="/login" 
            className={`flex-1 py-2 font-medium text-center ${
              activeTab === "login" ? "bg-white" : "bg-gray-100"
            }`}
          >
            Cadastro
          </Link>
          <button 
            className={`flex-1 py-2 font-medium text-center ${
              activeTab === "cadastro" ? "bg-white" : "bg-gray-100"
            }`}
            onClick={() => setActiveTab("cadastro")}
          >
            Login
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input 
                id="name" 
                type="text" 
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="seu.nome@fraga.com.br"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  required
                />
                <button 
                  type="button"
                  className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <div className="relative">
                <Input 
                  id="confirmPassword" 
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••"
                  required
                />
                <button 
                  type="button"
                  className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full bg-gray-900 hover:bg-black">
              Cadastrar
            </Button>
          </CardFooter>
        </form>
        
        <div className="px-6 py-4 text-center text-sm text-gray-600">
          Utilize seu email corporativo (@fraga.com.br) para acessar.
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
