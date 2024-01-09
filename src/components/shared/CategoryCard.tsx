// VideoCard.tsx
import game from "../../pages/game-pubg.jpg";
import Tag from "@components/ui/Tag";
import { tv } from "tailwind-variants";
import { useNavigate } from "react-router-dom";

const CategoryCard = () => {
  const navigate = useNavigate();

  const card = tv({
    slots: {
      cardContainer: "mx-auto duration-300 bg-primary cursor-pointer",
      imageCover: "h-full",
      cardContent: "pt-2",
      flexContainer: "flex items-center gap-3",
      titleContainer: "col-span-1",
      title: "font-semibold",
      username: "cursor-pointer text-soft",
      categoryName: "cursor-pointer text-soft",
      tagsContainer: "flex flex-wrap gap-2 items-center mt-2",
      liveScreenCard:
        "relative hover:translate-x-1 hover:-translate-y-1 transition-all duration-200 h-48 w-full",
    },
  });

  const {
    cardContainer,
    imageCover,
    cardContent,
    flexContainer,
    titleContainer,
    title,
    tagsContainer,
    liveScreenCard,
  } = card();

  const handleLink = () => {
    navigate("/directory/category/player-unknown-battleground");
  };

  return (
    <div className="cursor-pointer flex flex-col" onClick={handleLink}>
      <div className={cardContainer()}>
        <div className={liveScreenCard()}>
          <img className={imageCover()} src={game} alt={"sample"} />
        </div>
      </div>

      <div className={cardContent()}>
        <div className={flexContainer()}>
          <div className={titleContainer()}>
            <div className={title()}>{"Grand Theif Auto"}</div>
            <div className="text-xs">141K viewers</div>
          </div>
        </div>
        <div className={tagsContainer()}>
          <Tag to={""}>game</Tag>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
