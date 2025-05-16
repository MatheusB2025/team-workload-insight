
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
      image: "/lovable-uploads/fd50822e-f808-40c7-83fd-06b7a60debac.png",
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
      image: "/lovable-uploads/6a8028cf-1304-4655-969a-1c69416acc6e.png",
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
      image: "/lovable-uploads/9dbf9f7c-cbf7-45c0-90f8-329157c13ea8.png",
      tasks: [
        { id: "task-8", name: "Planejar campanha", assignedTo: "member-3", days: ["Seg", "Ter", "Qua", "Qui"] },
        { id: "task-9", name: "Analisar métricas", assignedTo: "member-3", days: ["Ter", "Qua"] },
        { id: "task-10", name: "Preparar reunião", assignedTo: "member-3", days: ["Qui", "Sex"] },
      ],
      workload: 30,
    },
    // Adding new team members with their images
    {
      id: "member-4",
      name: "Ricardo Ferraz",
      initials: "RF",
      image: "/lovable-uploads/3549bc11-9161-41e5-ab01-f37974378e05.png",
      tasks: [],
      workload: 0,
    },
    {
      id: "member-5",
      name: "João Victor",
      initials: "JV",
      image: "/lovable-uploads/73b77422-cb72-4cf4-822e-cbd7b1c34aaf.png",
      tasks: [],
      workload: 0,
    },
    {
      id: "member-6",
      name: "Eduardo Silva",
      initials: "ES",
      image: "/lovable-uploads/51dbca50-70e1-435a-bc3e-9e25e55202c8.png",
      tasks: [],
      workload: 0,
    },
    {
      id: "member-7",
      name: "Gabriel Santos",
      initials: "GS",
      image: "/lovable-uploads/5ae9d6d4-b76f-4811-aa5b-22b677fd5a92.png",
      tasks: [],
      workload: 0,
    },
    {
      id: "member-8",
      name: "Lucas Oliveira",
      initials: "LO",
      image: "/lovable-uploads/dd0d3f3d-7c00-4413-a24a-fdb2ff56774b.png",
      tasks: [],
      workload: 0,
    },
    {
      id: "member-9",
      name: "Marcelo Costa",
      initials: "MC",
      image: "/lovable-uploads/30f0c361-6ae4-47ad-9245-ed5d008a9c8f.png",
      tasks: [],
      workload: 0,
    },
    {
      id: "member-10",
      name: "Paulo Ribeiro",
      initials: "PR",
      image: "/lovable-uploads/eacb8b89-c1b8-4121-ad8d-ee604f00b53b.png",
      tasks: [],
      workload: 0,
    },
    {
      id: "member-11",
      name: "André Martins",
      initials: "AM",
      image: "/lovable-uploads/3eee0ace-7584-4109-8f81-2e38838773b8.png",
      tasks: [],
      workload: 0,
    },
    {
      id: "member-12",
      name: "Rafael Sousa",
      initials: "RS",
      image: "/lovable-uploads/14a5826a-b4bd-41f1-be56-ede11ff1ad0b.png",
      tasks: [],
      workload: 0,
    },
    {
      id: "member-13",
      name: "Miguel Lima",
      initials: "ML",
      image: "/lovable-uploads/65ea48e2-aab5-4833-8aaf-1fe7a2e99386.png",
      tasks: [],
      workload: 0,
    },
  ],
};

export const initialUsers: User[] = [
  { id: "1", name: "Admin", email: "admin@example.com", role: "Administrador", initials: "AD" },
  { id: "2", name: "Viewer", email: "viewer@example.com", role: "Leitor", initials: "VI" },
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
