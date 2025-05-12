
export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
}

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  image?: string;
  tasks: Task[];
  workload: number;
}

export interface Task {
  id: string;
  name: string;
  assignedTo: string;
  days: Day[];
}

export type Day = 'Seg' | 'Ter' | 'Qua' | 'Qui' | 'Sex';
export type DayFull = 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta';

export const DaysMap: Record<Day, DayFull> = {
  'Seg': 'Segunda',
  'Ter': 'Terça',
  'Qua': 'Quarta',
  'Qui': 'Quinta',
  'Sex': 'Sexta',
};

export const FullDays: DayFull[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
export const ShortDays: Day[] = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string; // Added the missing avatar property to fix the build error
}

export type UserRole = 'Administrador' | 'Leitor';

export type WorkloadStatus = 'Inadequada' | 'Adequada' | 'Elevada';

export interface Sprint {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}
