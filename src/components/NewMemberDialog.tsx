
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTeam } from "@/context/TeamContext";
import { useFileUpload } from "@/hooks/useFileUpload";
import { User, Camera } from "lucide-react";

interface NewMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewMemberDialog: React.FC<NewMemberDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { addMember } = useTeam();
  const [name, setName] = useState("");
  const { file, preview, handleFileChange, clearFile } = useFileUpload();
  
  const handleSubmit = () => {
    if (name.trim()) {
      addMember(name, preview || undefined);
      setName("");
      clearFile();
      onOpenChange(false);
    }
  };

  // Create initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Colaborador</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Avatar preview */}
          <div className="flex justify-center mb-2">
            <Avatar className="h-24 w-24">
              {preview ? (
                <AvatarImage src={preview} alt="Preview" />
              ) : (
                <AvatarFallback className="bg-gray-200 text-xl">
                  {name ? getInitials(name) : <User className="h-12 w-12 text-gray-400" />}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Nome
            </label>
            <Input
              id="name"
              placeholder="Nome do colaborador"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="image" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Imagem
            </label>
            <div className="flex gap-2">
              <label htmlFor="image-upload" className="flex-1">
                <Button 
                  variant="outline" 
                  className="w-full justify-start cursor-pointer" 
                  type="button" 
                  asChild
                >
                  <div>
                    <Camera className="h-4 w-4 mr-2" />
                    {file ? file.name : "Upload de Imagem"}
                  </div>
                </Button>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {file && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={clearFile} 
                  type="button"
                >
                  ✖
                </Button>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Adicionar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
