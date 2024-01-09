import React from "react";
import { CategoryLink } from "@components/ui/CategoryLink";
import gamingImg from "@assets/images/gaming.svg";
import irlImg from "@assets/images/irl.svg";
import musicImg from "@assets/images/music.svg";
import esportsImg from "@assets/images/esports.svg";
import creativeImg from "@assets/images/creative.svg";

interface DirectoryCategoryProps {
  to: string;
  imgUrl: string;
  name: string;
  // Add any additional props specific to DirectoryCategory
}

const DirectoryCategory: React.FC<DirectoryCategoryProps> = () => {
  return (
    <div className="grid grid-flow-col auto-cols-max py-3 gap-2 overflow-auto">
      <CategoryLink
        to={"/directory/gaming"}
        color="default"
        size="md"
        icon={<img src={gamingImg} alt="icon" />}
      >
        Games
      </CategoryLink>

      <CategoryLink
        to="/directory/irl"
        color="default"
        size="md"
        icon={<img src={irlImg} alt="icon" />}
      >
        IRL
      </CategoryLink>

      <CategoryLink
        to="/directory/music"
        color="default"
        size="md"
        icon={<img src={musicImg} alt="icon" />}
      >
        Music
      </CategoryLink>

      <CategoryLink
        to="/directory/esports"
        color="default"
        size="md"
        icon={<img src={esportsImg} alt="icon" />}
      >
        Esports
      </CategoryLink>

      <CategoryLink
        to="/directory/creative"
        color="default"
        size="md"
        icon={<img src={creativeImg} alt="icon" />}
      >
        Creative
      </CategoryLink>

      <CategoryLink
        to="/directory/esports"
        color="default"
        size="md"
        icon={<img src={esportsImg} alt="icon" />}
      >
        Esports
      </CategoryLink>
    </div>
  );
};

export default DirectoryCategory;
