import React, { useState } from 'react';
import { FC } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import {
  LuArrowDownUp,
  LuArrowLeftFromLine,
  LuArrowRightFromLine,
  LuArrowUpDown,
} from 'react-icons/lu';
import { SidebarItem } from '../Sidebaritem';
import johndoe from '../../../../src/assets/images/johndoe.jpg';
import { FaRegHeart } from 'react-icons/fa';
import { CollapsedSidebarItem } from '../CollapsedSidebarItem';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '@store/slices/sidebarSlice';

import { RootState } from 'store';

interface SidebarProps {
  // You can add any other props as needed
}

const sidebar = tv({
  base: [
    'w-64 h-screen bg-background-base overflow-y-auto fixed top-[50px] left-0 z-40',
  ],
  variants: {
    collapsed: {
      true: ['w-[60px]', 'overflow-hidden', ],
      false: ['w-64'],
    },
  },
  defaultVariants: {},
});

const userDataList = [
  {
    profilePicture: johndoe,
    name: 'John Doe',
    category: 'Gaming',
    viewers: 1.2,
  },
  {
    profilePicture: johndoe,
    name: 'Jane Doe',
    category: 'Just Chatting',
    viewers: 1.7,
  },

  {
    profilePicture: johndoe,
    name: "Jack",
    category: 'Games',
    viewers: null
    
  }
  // Add more user data as needed
];

const contentContainer = tv({
  base: ['mt-[100px]'],
  variants: {
    collapsed: {
      true: [''],
      false: [''],
    },
  },

  defaultVariants: {},
});

const Sidebar: FC<SidebarProps> = () => {
  // const [collapsed, setCollapsed] = useState(true);
  const collapsed = useSelector((state: RootState ) => state.sidebar.isSidebarOpen)
  const dispatch = useDispatch();


  return (
    <div className="flex justify-between items-center">
      <div className={sidebar({ collapsed })}>
        <div className="flex">
          {!collapsed ? (
            <div className="text-foreground flex-nowrap text-lg font-semibold absolute left-3 top-4 mx-auto">
              For You
            </div>
          ) : (
            ''
          )}
          <button
          className="absolute right-1 top-2 hover:bg-background-item/20 text-foreground rounded-sm p-3"
            
          onClick={() => dispatch(toggleSidebar())}
          >
            {collapsed ? (
              <LuArrowRightFromLine size={20} className="" />
            ) : (
              <LuArrowLeftFromLine size={20} className= "" />
            )}
          </button>
        </div>


{/* Followed channels  */}
<div>
<div className="flex">
          {!collapsed ? (
            <div className="text-foreground flex-nowrap text-sm absolute left-3 top-16 mx-auto">
              Followed Channels
            </div>
          ) : (
            ''
          )}

          {collapsed ? (
            <FaRegHeart size={18} className="absolute right-5 top-16" />
          ) : (
            <LuArrowUpDown size={16} className="absolute right-3 top-16" />
          )}
        </div>

        <div className={contentContainer({ collapsed })}>
          {/* Your main content goes here */}
          {/* Example: <MainContent /> */}
          <div className="mx-auto">
            {userDataList.map((userData) => (
              <div className="" key={userData.name}>
                {/* Use the new component for collapsed state */}
                {collapsed ? (
                  <CollapsedSidebarItem
                    profilePicture={userData.profilePicture}
                  />
                ) : (
                  <SidebarItem
                    profilePicture={userData.profilePicture}
                    name={userData.name}
                    category={userData.category}
                    viewers={userData.viewers}
                  />
                )}
              </div>
            ))}
          </div>
        </div>


</div>

{/* Rommended channels  */}





      </div>
    </div>
  );
};

export default Sidebar;
