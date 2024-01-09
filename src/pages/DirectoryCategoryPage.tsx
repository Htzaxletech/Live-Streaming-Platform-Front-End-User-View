import React from "react";
import { useParams } from "react-router-dom";
import Heading from "@components/ui/Heading";
import DirectoryCategory from "@components/shared/DirectoryCategory";
import LivePage from "./LivePage";
// import Button from "@components/ui/Button";
// import { IoIosArrowDown } from "react-icons/io";
import ShowMoreButton from "@components/ui/ShowMoreButton";

interface DirectoryCategoryProps {
  to: string;
  imgUrl: string;
  name: string;
  // Add any additional props specific to DirectoryCategory
}

const DirectoryCategoryPage: React.FC<DirectoryCategoryProps> = ({
  to,
  imgUrl,
  name,
}) => {
  const { dirCategoryName } = useParams();

  return (
		<div className="py-6 pb-20 px-4">
			<Heading
				className={`my-4 text-5xl ${
					dirCategoryName === "irl" ? "uppercase" : "capitalize"
				}`}
			>
				{dirCategoryName}
			</Heading>

			<div className="text-2xl mb-4 font-semibold text-gray-600">
				Live streams of all your favorite games, from shooters to
				platformers and everything in between
			</div>

			<DirectoryCategory to={to} imgUrl={imgUrl} name={name} />

			<Heading size="sm" className="my-2 text-gray-900 dark:text-gray-100">
				Shooter
			</Heading>
			<LivePage />
			{/* <div className="flex">
        <div className="relative flex-grow">
          <div className="top-1/2 border-t-2 absolute w-full"></div>
        </div>
        <div className="px-2 flex">
          <Button className="bg-transparent text-primary hover:text-black dark:hover:text-white">
            <div className="mr-2">
              <p>Show More {dirCategoryName}</p>
            </div>
            <IoIosArrowDown />
          </Button>
        </div>
        <div className="relative flex-grow">
          <div className="top-1/2 border-t-2 absolute w-full"></div>
        </div>
      </div> */}

			<ShowMoreButton onClick={() => alert("hi")} title={"Shooter"} />
		</div>
  );
};

export default DirectoryCategoryPage;
