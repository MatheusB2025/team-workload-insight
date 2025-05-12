
import { useState } from "react";
import { TeamLayout } from "@/components/Layouts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTeam } from "@/context/TeamContext";
import { UserRole } from "@/types";
import { Edit, Trash2, UserPlus } from "lucide-react";
import { toast } from "sonner";

const UsersPage = () => {
  const { users, addUser, removeUser, editUser } = useTeam();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{id: string, name: string, email: string, role: UserRole} | null>(null);
  
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("Leitor");
  
  const filteredUsers = searchQuery
    ? users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users;
  
  const handleAddUser = () => {
    if (name.trim() && email.trim()) {
      addUser(name, email, role);
      resetForm();
      setIsAddUserOpen(false);
    } else {
      toast.error("Preencha todos os campos obrigatórios");
    }
  };
  
  const handleEditUser = () => {
    if (selectedUser && name.trim() && email.trim()) {
      editUser(selectedUser.id, name, email, role);
      resetForm();
      setIsEditUserOpen(false);
    } else {
      toast.error("Preencha todos os campos obrigatórios");
    }
  };
  
  const openEditDialog = (user: {id: string, name: string, email: string, role: UserRole}) => {
    setSelectedUser(user);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setIsEditUserOpen(true);
  };
  
  const resetForm = () => {
    setName("");
    setEmail("");
    setRole("Leitor");
    setSelectedUser(null);
  };

  return (
    <TeamLayout>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-xl font-bold">Gerenciamento de Usuários</h1>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Input
                type="text"
                placeholder="Buscar usuário..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Button onClick={() => setIsAddUserOpen(true)}>
              <UserPlus className="mr-2 h-4 w-4" /> Novo Usuário
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Perfil</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => removeUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                    Nenhum usuário encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={(open) => {
        setIsAddUserOpen(open);
        if (!open) resetForm();
      }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar Usuário</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name">Nome</label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome completo"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@exemplo.com"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="role">Perfil</label>
              <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um perfil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Administrador">Administrador</SelectItem>
                  <SelectItem value="Leitor">Leitor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddUser}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={(open) => {
        setIsEditUserOpen(open);
        if (!open) resetForm();
      }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="edit-name">Nome</label>
              <Input
                id="edit-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome completo"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-email">Email</label>
              <Input
                id="edit-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@exemplo.com"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-role">Perfil</label>
              <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um perfil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Administrador">Administrador</SelectItem>
                  <SelectItem value="Leitor">Leitor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditUser}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TeamLayout>
  );
};

export default UsersPage;
