import React from 'react';

interface CollapsedSidebarItemProps {
  profilePicture: string;
}

const CollapsedSidebarItem: React.FC<CollapsedSidebarItemProps> = ({ profilePicture }) => {
  return (
    <div className="mb-3 ml-3">
      <img src={profilePicture} alt="Profile" className="w-10 h-10 rounded-full" />
    </div>
  );
};

export default CollapsedSidebarItem;
