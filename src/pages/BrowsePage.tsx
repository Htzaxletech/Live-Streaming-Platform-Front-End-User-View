import CategoryCard from "@components/shared/CategoryCard";
import jsonData from "./test.json";
import { Select } from "@components/ui/Select";
import { BsStars } from "react-icons/bs";
import { FaArrowDownWideShort } from "react-icons/fa6";
import Input from "@components/ui/Input";
import { RiSearchLine } from "react-icons/ri";
import Button from "@components/ui/Button";
import LivePage from "./LivePage";

const CategoryCardList = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-8 gap-3">
    {/* <div className="flex flex-wrap gap-2"> */}
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

const BrowsePage = ({ status }) => {
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
      <div className="flex flex-wrap items-center justify-between mb-6">
        <Input
          className="hidden md:flex h-8"
          startContent={<RiSearchLine />}
          placeholder="Search Category Tags"
        />
        <Button className="md:hidden">
          <RiSearchLine />
        </Button>
        <div>
          <span className="font-semibold">Sort By</span>
          <Select options={options} className="z-10 h-8" />
        </div>
      </div>

      {status === "categories" && <CategoryCardList />}
      {status === "live" && <LivePage />}
    </div>
  );
};

export default BrowsePage;
