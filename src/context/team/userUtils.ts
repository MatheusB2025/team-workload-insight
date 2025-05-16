
import { User, UserRole } from "@/types";
import { toast } from "sonner";

export const addUser = (
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  name: string, 
  email: string, 
  role: UserRole
) => {
  // Generate initials from name
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
    
  const newUser: User = {
    id: `user-${Date.now()}`,
    name,
    email,
    role,
    initials
  };
  
  setUsers([...users, newUser]);
  toast.success(`Usuário ${name} adicionado com sucesso!`);
};

export const removeUser = (
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  id: string
) => {
  const user = users.find(u => u.id === id);
  if (!user) return;
  
  setUsers(users.filter(u => u.id !== id));
  toast.success(`Usuário ${user.name} removido com sucesso!`);
};

export const editUser = (
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  id: string, 
  name: string, 
  email: string, 
  role: UserRole
) => {
  // Generate new initials if name has changed
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
    
  setUsers(users.map(user => {
    if (user.id === id) {
      return { ...user, name, email, role, initials };
    }
    return user;
  }));
  
  toast.success(`Usuário atualizado com sucesso!`);
};
