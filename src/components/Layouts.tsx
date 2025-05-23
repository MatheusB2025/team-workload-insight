
import React, { ReactNode } from "react";
import { useTeam } from "@/context/TeamContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LayoutProps {
  children: ReactNode;
  containerClassName?: string;
}

export const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div className="h-full">
      {children}
    </div>
  );
};

export const TeamLayout = ({ children, containerClassName = "" }: LayoutProps) => {
  const { currentTeam } = useTeam();

  return (
    <div className="h-full">
      {children}
    </div>
  );
};

export const MemberLayout = ({ children }: LayoutProps) => {
  const { currentTeam } = useTeam();
  
  // Create a function to render the avatar
  const renderAvatar = (image?: string, name?: string) => {
    const initials = getInitials(name || "User");
    
    return (
      <Avatar className="h-10 w-10 border">
        {image && <AvatarImage src={image} alt={name || "User"} />}
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    );
  };

  // Helper function to get initials from a name
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          {renderAvatar(undefined, currentTeam.name)}
          <div>
            <div className="font-bold">{currentTeam.name}</div>
            <div className="text-sm text-gray-500">Equipe</div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};
