import React from 'react';
import { Link } from 'react-router-dom';

import * as Tooltip from '@radix-ui/react-tooltip';

interface SidebarItemProps {
  profilePicture: string;
  name: string;
  category: string;
  viewers: number | null;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ profilePicture, name, category, viewers }) => {
  return (
    <Tooltip.Provider delayDuration={50}>
      <Tooltip.Root>
       
          <Tooltip.Trigger>
          <Link to="" target="_blank" rel="noopener noreferrer">
            <div className="flex px-3 cursor-pointer w-full py-2">
              <div className="rounded-full overflow-hidden w-10 h-10 mr-3">
                <img className="w-full h-full object-cover" src={profilePicture} alt={`${name}'s profile`} />
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="text-foreground font-bold text-[15px] text-start">{name}</span>
                  <span className="text-foreground-secondary text-[13px] text-start">{category}</span>
                </div>
                {viewers ? (
                  <div className="flex justify-center items-center absolute right-3">
                    <span className="w-2 h-2 bg-danger rounded-full mr-1"></span>
                    <span className="text-foreground text-sm text-[14px]">{viewers.toFixed(1)}k</span>
                  </div>
                ) : (
                  <div className="text-foreground-secondary text-sm absolute right-3">offline</div>
                )}
              </div>
            </div>
            </Link>
          </Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content
            sideOffset={15}
            align="start"
            side="right"
            className=" bg-background-base px-3 py-2  text-base z-40 rounded-md text-foreground absolute left-20"
          >
            <div className="text-justify text-primary">{name}</div>
            <div className="text-justify text-primary">{category}</div>
            <div className="text-justify text-base">2k{viewers}</div>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default SidebarItem;
