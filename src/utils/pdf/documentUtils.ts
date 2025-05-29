
import { Sprint } from "@/context/team/types";
import { generatePrintStyles } from './printStyles';
import { generateMembersListHtml } from './htmlUtils';

export const generateHtmlDocument = (sprint: Sprint, members: any[]) => {
  return `
    <html>
      <head>
        <title>Sprint: ${sprint.name}</title>
        ${generatePrintStyles()}
      </head>
      <body>
        <h2>Equipe e Tarefas</h2>
        ${generateMembersListHtml(members)}
      </body>
    </html>
  `;
};

export const getTeamData = () => {
  return window.__TEAM_DATA__ ? window.__TEAM_DATA__() : { members: [] };
};
