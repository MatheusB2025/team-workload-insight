
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTeam } from "@/context/TeamContext";
import { useFileUpload } from "@/hooks/useFileUpload";
import { TeamMember } from "@/types";
import { User, Camera } from "lucide-react";

interface EditMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: TeamMember;
}

export const EditMemberDialog: React.FC<EditMemberDialogProps> = ({
  open,
  onOpenChange,
  member,
}) => {
  const { editMember } = useTeam();
  const [name, setName] = useState(member.name);
  const { file, preview, handleFileChange, clearFile } = useFileUpload();
  
  const handleSubmit = () => {
    if (name.trim()) {
      editMember(member.id, name, preview || member.image);
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
          <DialogTitle>Editar Colaborador</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Avatar preview */}
          <div className="flex justify-center mb-2">
            <Avatar className="h-24 w-24">
              {(preview || member.image) ? (
                <AvatarImage src={preview || member.image} alt="Preview" />
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
              <label htmlFor="edit-image-upload" className="flex-1">
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
                  id="edit-image-upload"
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
          <Button onClick={handleSubmit}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
