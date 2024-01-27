import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Heading from "@components/ui/Heading";
import DirectoryCategory from "@components/shared/DirectoryCategory";
import CategoryListByMainCategoryID from "./CategoryListByMainCategoryID";
import LiveListByMainCategoryID from "./LiveListByMainCategoryID";

const DirectoryCategoryPage: React.FC = () => {
	const { dirCategoryName } = useParams();
	const { state } = useLocation();

	console.log("state", state);

	return (
		<div className="py-6 pb-20 px-4">
			<Heading className={`my-4 text-5xl capitalize`}>
				{dirCategoryName}
			</Heading>

			{state?.categoryState?.description && (
				<div className="text-2xl mb-4 font-semibold text-gray-600">
					{/* Live streams of all your favorite games, from shooters to
				platformers and everything in between */}
					{state?.categoryState?.description}
				</div>
			)}

			<DirectoryCategory />
			<CategoryListByMainCategoryID />
			<LiveListByMainCategoryID />
		</div>
	);
};

export default DirectoryCategoryPage;
