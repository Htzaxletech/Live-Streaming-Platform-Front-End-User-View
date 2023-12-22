import CategoryCard from "@components/shared/CategoryCard"
import CategoryHeader from "@components/shared/CategoryHeader"
import jsonData from "./test.json"
import Heading from "@components/ui/Heading"
import { CategoryLink } from "@components/ui/CategoryLink"
import gamingImg from "@assets/images/gaming.svg"
import irlImg from "@assets/images/irl.svg"
import musicImg from "@assets/images/music.svg"
import esportsImg from "@assets/images/esports.svg";
import creativeImg from "@assets/images/creative.svg"
import Tab from "@components/ui/Tab"
import FollowingPage from "./FollowingPage"
import { Select } from "@components/ui/Select"
import { BsStars } from "react-icons/bs";
import { FaArrowDownWideShort } from "react-icons/fa6";
import BrowsePage from "./BrowsePage"
import DirectoryCategory from "@components/shared/DirectoryCategory"



const Wrapper = ({
  children: Component,
}: {
  children: ({ title }: { title: string }) => JSX.Element
}) => {
  return (
    <div className="border-2">
      <Component title="Component" />
    </div>
  )
}

const TestChild = ({ title }: { title: string }) => <p>Hello {title}</p>

const CategoryCardList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-10 gap-3">
      {Array.from({ length: 13 }).map((_, index) => (
        <CategoryCard
          key={index}
          index={index}
          user={jsonData.user}
          isLive={jsonData.isLive}
        />
      ))}
    </div>
  );
};

const DirectoryPage = () => {


  const options = [
    { option: "Recommended for you", value: "1", icon: <BsStars /> },
    {
      option: "Views(high to low)",
      value: "2",
      icon: <FaArrowDownWideShort />,
    },
  ];

  return (
    <div>
      <Heading className="my-4 text-5xl">Browse</Heading>
      {/* <Wrapper>{TestChild}</Wrapper> */}

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

      <Tab
        tabs={[
          { label: "Categories", content: <BrowsePage status="categories" /> },
          { label: "Live Channels", content: <BrowsePage status="live" /> },
        ]}
        className="mt-3"
      />
    </div>
  );
}

export default DirectoryPage
