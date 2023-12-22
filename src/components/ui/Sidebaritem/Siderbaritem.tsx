// SidebarItem.tsx
import React from 'react';

interface SidebarItemProps {
  profilePicture: string;
  name: string;
  category: string;
  viewers: number | null;
}


const SidebarItem: React.FC<SidebarItemProps> = ({ profilePicture, name, category, viewers }) => {
  return (
   
    <div className="flex px-3 cursor-pointer w-full mb-3">
      <div className="rounded-full overflow-hidden w-10 h-10 mr-3">
        <img className="w-full h-full object-cover" src={profilePicture} alt={`${name}'s profile`} />
      </div>
      <div className="flex justify-between">
      <div className="flex flex-col">
        <span className="text-foreground font-bold text-[15px]">{name}</span>
        <span className="text-foreground-secondary text-[13px]">{category}</span>
      </div>

  { viewers ?      (<div className="flex justify-center items-center absolute right-3">
      <span className="w-2 h-2 bg-danger rounded-full mr-1"></span>
      <span className="text-foreground text-sm text-[14px]">{viewers.toFixed(1)}k</span>
      </div>) : (<div className="text-foreground-secondary text-sm absolute right-3">offline</div>)}
    </div>
    </div>
   
  );
};

export default SidebarItem;
