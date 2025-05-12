
import { Team, Sprint, SprintFolder } from "./types";
import { User } from "@/types";

export const initialTeam: Team = {
  id: "team-1",
  name: "Equipe - CIT",
  members: [
    {
      id: "member-1",
      name: "Ana Silva",
      initials: "AS",
      tasks: [
        { id: "task-1", name: "Criar apresentação", assignedTo: "member-1", days: ["Seg", "Ter"] },
        { id: "task-2", name: "Revisar documentação", assignedTo: "member-1", days: ["Qua", "Qui"] },
        { id: "task-3", name: "Preparar relatório", assignedTo: "member-1", days: ["Seg", "Ter", "Qua"] },
      ],
      workload: 30,
    },
    {
      id: "member-2",
      name: "Carlos Oliveira",
      initials: "CO",
      tasks: [
        { id: "task-4", name: "Implementar nova feature", assignedTo: "member-2", days: ["Seg", "Ter"] },
        { id: "task-5", name: "Corrigir bugs do sistema", assignedTo: "member-2", days: ["Qua", "Qui"] },
        { id: "task-6", name: "Otimizar consultas", assignedTo: "member-2", days: ["Ter", "Qua"] },
        { id: "task-7", name: "Documentar API", assignedTo: "member-2", days: ["Qua", "Qui", "Sex"] },
      ],
      workload: 40,
    },
    {
      id: "member-3",
      name: "Mariana Costa",
      initials: "MC",
      tasks: [
        { id: "task-8", name: "Planejar campanha", assignedTo: "member-3", days: ["Seg", "Ter", "Qua", "Qui"] },
        { id: "task-9", name: "Analisar métricas", assignedTo: "member-3", days: ["Ter", "Qua"] },
        { id: "task-10", name: "Preparar reunião", assignedTo: "member-3", days: ["Qui", "Sex"] },
      ],
      workload: 30,
    },
  ],
};

export const initialUsers: User[] = [
  { id: "1", name: "Admin", email: "admin@example.com", role: "Administrador" },
  { id: "2", name: "Viewer", email: "viewer@example.com", role: "Leitor" },
];

export const initialSprintFolders: SprintFolder[] = [
  { id: "folder-1", name: "Maio 2025", isOpen: true },
  { id: "folder-2", name: "Junho 2025", isOpen: false },
];

export const initialSprints: Sprint[] = [
  { id: 1, name: "Semana 1", startDate: "2025-05-05", endDate: "2025-05-11", folderId: "folder-1" },
  { id: 2, name: "Semana 2", startDate: "2025-05-12", endDate: "2025-05-18", folderId: "folder-1" },
  { id: 3, name: "Semana 3", startDate: "2025-05-19", endDate: "2025-05-25", folderId: "folder-1" },
  { id: 4, name: "Semana 4", startDate: "2025-05-26", endDate: "2025-06-01", folderId: "folder-1" },
  { id: 5, name: "Semana 1", startDate: "2025-06-02", endDate: "2025-06-08", folderId: "folder-2" },
  { id: 6, name: "Semana 2", startDate: "2025-06-09", endDate: "2025-06-15", folderId: "folder-2" },
];
