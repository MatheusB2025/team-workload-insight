
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const { requestPasswordReset } = useAuth();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestPasswordReset(email);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-app-bg">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-red-600">
            Recuperar senha
          </CardTitle>
          <CardDescription className="text-center">
            Digite seu email para receber uma senha temporária
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
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
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full bg-gray-900 hover:bg-black">
              Enviar senha temporária
            </Button>
            <Link to="/login" className="text-sm text-center text-primary hover:underline w-full">
              Voltar ao login
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
