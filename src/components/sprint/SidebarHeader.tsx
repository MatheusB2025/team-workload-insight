
import React from "react";

interface SidebarHeaderProps {
  title: string;
  description?: string;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ title, description }) => {
  return (
    <div className="p-4 border-b">
      <div className="font-medium text-base mb-2">{title}</div>
      {description && <div className="text-xs text-gray-500 mb-2">{description}</div>}
    </div>
  );
};
