
export const generateMemberAvatarHtml = (member: any) => {
  return member.image 
    ? `<img src="${member.image}" alt="${member.name}" />`
    : member.initials;
};

export const generateTaskDaysHtml = (task: any) => {
  if (!task.days || task.days.length === 0) {
    return '';
  }
  
  return task.days.map((day: string) => 
    `<span class="task-day">${day}</span>`
  ).join('');
};

export const generateTasksListHtml = (tasks: any[]) => {
  if (!tasks || tasks.length === 0) {
    return '<p>Sem tarefas atribuídas</p>';
  }
  
  const taskItems = tasks.map(task => `
    <li class="task-item">
      <div class="task-name">${task.name}</div>
      <div class="task-days">
        ${generateTaskDaysHtml(task)}
      </div>
    </li>
  `).join('');
  
  return `<ul class="task-list">${taskItems}</ul>`;
};

export const generateMemberCardHtml = (member: any) => {
  return `
    <div class="member-card">
      <div class="member-header">
        <div class="member-avatar">
          ${generateMemberAvatarHtml(member)}
        </div>
        <div class="member-info">
          <div class="member-name">${member.name}</div>
          <div class="workload">Carga: ${member.workload}%</div>
        </div>
      </div>
      ${generateTasksListHtml(member.tasks)}
    </div>
  `;
};

export const generateMembersListHtml = (members: any[]) => {
  if (!members || members.length === 0) {
    return '<p>Nenhum membro na equipe</p>';
  }
  
  return members.map(member => generateMemberCardHtml(member)).join('');
};
