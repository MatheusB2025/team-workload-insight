
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTeam } from "@/context/TeamContext";

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
  
  const handleSubmit = () => {
    if (name.trim()) {
      addMember(name);
      setName("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Colaborador</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
            <Button variant="outline" className="w-full justify-start">
              Upload de Imagem
            </Button>
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
