
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatSprintDate = (dateString: string) => {
  return format(parseISO(dateString), "dd/MM", { locale: ptBR });
};

export const getCurrentFormattedDate = () => {
  return format(new Date(), "dd/MM/yyyy HH:mm", { locale: ptBR });
};

export const getSprintFileName = (sprintName: string) => {
  return `sprint-${sprintName.replace(/\s+/g, '-').toLowerCase()}.pdf`;
};
