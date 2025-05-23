
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sprint } from "@/context/team/types";
import { useTeam } from "@/context/TeamContext";

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

// Função para imprimir a sprint com dados da equipe e tarefas
export const printSprint = (sprint: Sprint) => {
  // Obter dados da equipe do contexto
  // Precisamos acessar os dados da equipe manualmente na função de impressão
  const teamData = window.__TEAM_DATA__ ? window.__TEAM_DATA__() : null;
  const members = teamData?.members || [];
  
  // Criar um elemento temporário para a impressão
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    alert('Por favor, permita popups para imprimir a sprint');
    return;
  }
  
  // Adicionar conteúdo ao popup com os dados dos membros da equipe e suas tarefas
  printWindow.document.write(`
    <html>
      <head>
        <title>Sprint: ${sprint.name}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { font-size: 24px; margin-bottom: 10px; }
          h2 { font-size: 18px; margin-top: 20px; margin-bottom: 10px; }
          .sprint-details { margin-bottom: 25px; }
          p { font-size: 14px; margin: 5px 0; }
          .date { color: #666; }
          .footer { margin-top: 30px; font-size: 12px; color: #999; }
          .member-card { 
            border: 1px solid #ddd; 
            padding: 15px; 
            margin-bottom: 15px; 
            border-radius: 4px;
          }
          .member-header {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
          }
          .member-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
            background-color: #f0f0f0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: #555;
            border: 1px solid #ddd;
            overflow: hidden;
          }
          .member-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .member-name { font-weight: bold; font-size: 16px; }
          .member-info { 
            display: flex; 
            flex-direction: column;
            flex: 1;
          }
          .workload {
            font-size: 12px;
            color: #666;
          }
          .task-list { list-style-type: none; padding-left: 0; margin-top: 10px; }
          .task-item { 
            padding: 8px 5px;
            border-bottom: 1px solid #eee; 
            display: flex;
            justify-content: space-between;
          }
          .task-name { flex: 1; }
          .task-days { display: flex; gap: 5px; }
          .task-day { 
            padding: 2px 5px; 
            border-radius: 3px; 
            background-color: #e9ecef; 
            font-size: 12px; 
          }
        </style>
      </head>
      <body>
        <h1>Sprint: ${sprint.name}</h1>
        <div class="sprint-details">
          <p>Período: ${formatSprintDate(sprint.startDate)} - ${formatSprintDate(sprint.endDate)}</p>
          <p>Status: ${sprint.archived ? 'Arquivada' : 'Ativa'}</p>
        </div>

        <h2>Equipe e Tarefas</h2>
  `);

  // Adicionar membros da equipe e suas tarefas
  if (members.length > 0) {
    members.forEach(member => {
      printWindow.document.write(`
        <div class="member-card">
          <div class="member-header">
            <div class="member-avatar">
              ${member.image 
                ? `<img src="${member.image}" alt="${member.name}" />`
                : member.initials
              }
            </div>
            <div class="member-info">
              <div class="member-name">${member.name}</div>
              <div class="workload">Carga: ${member.workload}%</div>
            </div>
          </div>
      `);
      
      if (member.tasks && member.tasks.length > 0) {
        printWindow.document.write(`<ul class="task-list">`);
        
        member.tasks.forEach(task => {
          printWindow.document.write(`
            <li class="task-item">
              <div class="task-name">${task.name}</div>
              <div class="task-days">
          `);
          
          if (task.days && task.days.length > 0) {
            task.days.forEach(day => {
              printWindow.document.write(`<span class="task-day">${day}</span>`);
            });
          }
          
          printWindow.document.write(`
              </div>
            </li>
          `);
        });
        
        printWindow.document.write(`</ul>`);
      } else {
        printWindow.document.write(`<p>Sem tarefas atribuídas</p>`);
      }
      
      printWindow.document.write(`</div>`);
    });
  } else {
    printWindow.document.write(`<p>Nenhum membro na equipe</p>`);
  }
  
  printWindow.document.write(`
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

