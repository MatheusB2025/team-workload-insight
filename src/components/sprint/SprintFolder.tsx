
import React from "react";
import { ChevronRight, FolderOpen, FolderClosed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SprintItem } from "./SprintItem";
import { Sprint, SprintFolder as SprintFolderType } from "@/context/team/types";

interface SprintFolderProps {
  folder: SprintFolderType;
  sprints: Sprint[];
  onToggle: (folderId: string) => void;
  onEditSprint: (sprint: Sprint) => void;
  onArchiveSprint: (id: number) => void;
  onUnarchiveSprint: (id: number) => void;
  onDeleteSprint: (id: number) => void;
}

export const SprintFolderComponent: React.FC<SprintFolderProps> = ({
  folder,
  sprints,
  onToggle,
  onEditSprint,
  onArchiveSprint,
  onUnarchiveSprint,
  onDeleteSprint
}) => {
  // Filter sprints for this folder
  const activeSprints = sprints.filter(sprint => 
    sprint.folderId === folder.id && !sprint.archived
  );
  
  const archivedSprints = sprints.filter(sprint => 
    sprint.folderId === folder.id && sprint.archived
  );

  // If no sprints in this folder, don't render anything
  if (activeSprints.length === 0 && archivedSprints.length === 0) {
    return null;
  }

  return (
    <div>
      <Collapsible open={folder.isOpen} onOpenChange={() => onToggle(folder.id)}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full justify-between font-medium text-xs py-1 h-8"
          >
            <div className="flex items-center">
              {folder.isOpen ? (
                <FolderOpen className="h-3.5 w-3.5 mr-2" />
              ) : (
                <FolderClosed className="h-3.5 w-3.5 mr-2" />
              )}
              {folder.name}
            </div>
            <ChevronRight className={`h-4 w-4 transition-transform ${folder.isOpen ? 'rotate-90' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {/* Active Sprints */}
          {activeSprints.length > 0 && (
            <div className="space-y-2 mt-1 pl-2">
              {activeSprints.map(sprint => (
                <SprintItem
                  key={sprint.id}
                  sprint={sprint}
                  onEdit={onEditSprint}
                  onArchive={onArchiveSprint}
                  onRestore={onUnarchiveSprint}
                  onDelete={onDeleteSprint}
                />
              ))}
            </div>
          )}
          
          {/* Archived Sprints */}
          {archivedSprints.length > 0 && (
            <div className="space-y-2 mt-1 pl-2">
              {archivedSprints.map(sprint => (
                <SprintItem
                  key={sprint.id}
                  sprint={sprint}
                  archived={true}
                  onEdit={onEditSprint}
                  onArchive={onArchiveSprint}
                  onRestore={onUnarchiveSprint}
                  onDelete={onDeleteSprint}
                />
              ))}
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
