
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

// Nova função para imprimir a sprint
export const printSprint = (sprint: Sprint) => {
  // Criar um elemento temporário para a impressão
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    alert('Por favor, permita popups para imprimir a sprint');
    return;
  }
  
  // Adicionar conteúdo ao popup
  printWindow.document.write(`
    <html>
      <head>
        <title>Sprint: ${sprint.name}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { font-size: 18px; margin-bottom: 10px; }
          p { font-size: 14px; margin: 5px 0; }
          .date { color: #666; }
          .footer { margin-top: 30px; font-size: 12px; color: #999; }
        </style>
      </head>
      <body>
        <h1>Sprint: ${sprint.name}</h1>
        <p>Período: ${formatSprintDate(sprint.startDate)} - ${formatSprintDate(sprint.endDate)}</p>
        <p>Status: ${sprint.archived ? 'Arquivada' : 'Ativa'}</p>
        <p class="footer">Documento impresso em: ${format(new Date(), "dd/MM/yyyy HH:mm", { locale: ptBR })}</p>
      </body>
    </html>
  `);
  
  // Imprimir e fechar
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 300);
};

