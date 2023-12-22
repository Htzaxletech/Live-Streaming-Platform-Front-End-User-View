import React, { MouseEvent } from "react";
import { IoArrowDown } from "react-icons/io5";
import Button from "@components/ui/Button";

interface ShowMoreButtonProps {
  title: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void; // Event handler for Button click
}

const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({ title, onClick }) => {
  const onButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <div className="flex">
      <div className="relative flex-grow">
        <div className="top-1/2 border-t-2 absolute w-full"></div>
      </div>
      <div className="px-2 flex">
        <Button
          className="bg-transparent text-primary hover:text-black dark:hover:text-white"
          onClick={onButtonClick}
        >
          <div className="mr-2">
            <p>Show More {title}</p>
          </div>
          <IoArrowDown />
        </Button>
      </div>
      <div className="relative flex-grow">
        <div className="top-1/2 border-t-2 absolute w-full"></div>
      </div>
    </div>
  );
};

export default ShowMoreButton;