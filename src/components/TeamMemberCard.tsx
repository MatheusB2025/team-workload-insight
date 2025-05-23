
import React, { useState } from "react";
import { TeamMember, Day } from "@/types";
import { useTeam } from "@/context/TeamContext";
import { EditMemberDialog } from "@/components/EditMemberDialog";
import { MemberHeader } from "@/components/team-member/MemberHeader";
import { MemberTaskItem } from "@/components/team-member/MemberTaskItem";
import { AddTaskButton } from "@/components/team-member/AddTaskButton";

interface TeamMemberCardProps {
  member: TeamMember;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const { addTask, removeTask, editTask, toggleTaskDay, transferTask, currentTeam, removeMember } = useTeam();
  const [isEditingMember, setIsEditingMember] = useState(false);

  const handleAddTask = (taskName: string) => {
    addTask(member.id, taskName);
  };

  const handleEditTask = (taskId: string, newTaskName: string) => {
    editTask(member.id, taskId, newTaskName);
  };

  const handleRemoveTask = (taskId: string) => {
    removeTask(member.id, taskId);
  };

  const handleToggleTaskDay = (taskId: string, day: Day) => {
    toggleTaskDay(member.id, taskId, day);
  };

  const handleTransferTask = (taskId: string, toMemberId: string) => {
    transferTask(taskId, member.id, toMemberId);
  };

  const handleRemoveMember = () => {
    removeMember(member.id);
  };

  const otherMembers = currentTeam.members.filter(m => m.id !== member.id);

  return (
    <div className="border-t pt-3 pb-2">
      <MemberHeader
        member={member}
        onEdit={() => setIsEditingMember(true)}
        onRemove={handleRemoveMember}
      />

      <div className="space-y-2 pl-9">
        {member.tasks.map((task) => (
          <MemberTaskItem
            key={task.id}
            task={task}
            member={member}
            otherMembers={otherMembers}
            onEditTask={handleEditTask}
            onRemoveTask={handleRemoveTask}
            onToggleTaskDay={handleToggleTaskDay}
            onTransferTask={handleTransferTask}
          />
        ))}

        <AddTaskButton onAddTask={handleAddTask} />
      </div>

      {/* Edit Member Dialog */}
      <EditMemberDialog
        open={isEditingMember}
        onOpenChange={setIsEditingMember}
        member={member}
      />
    </div>
  );
};
