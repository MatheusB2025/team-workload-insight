
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sprint } from "@/context/team/types";

// Formatar data da sprint
const formatSprintDate = (dateString: string) => {
  return format(parseISO(dateString), "dd/MM", { locale: ptBR });
};

// Exportar uma sprint para PDF
export const exportSprintToPDF = async (sprint: Sprint) => {
  // Criar nova instância do jsPDF
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  // Configurar o título do documento
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.text(`Sprint: ${sprint.name}`, 20, 20);
  
  // Adicionar período da sprint
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  pdf.text(
    `Período: ${formatSprintDate(sprint.startDate)} - ${formatSprintDate(sprint.endDate)}`,
    20, 
    30
  );
  
  // Adicionar informação de status (arquivado ou não)
  pdf.setFontSize(12);
  pdf.text(
    `Status: ${sprint.archived ? 'Arquivada' : 'Ativa'}`,
    20, 
    40
  );

  // Adicionar informações adicionais...
  pdf.setFontSize(12);
  pdf.text(
    `Documento gerado em: ${format(new Date(), "dd/MM/yyyy HH:mm", { locale: ptBR })}`,
    20, 
    50
  );
  
  // Salvar o PDF
  pdf.save(`sprint-${sprint.name.replace(/\s+/g, '-').toLowerCase()}.pdf`);
};
