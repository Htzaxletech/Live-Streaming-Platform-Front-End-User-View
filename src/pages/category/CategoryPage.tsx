import { lazy } from "react";
import CategoryHeader from "@components/shared/CategoryHeader";
import LiveByCategoryID from "./LiveByCategoryID";
import Tab from "@components/ui/Tab";

const VODByCategoryID = lazy(() => import("./VODByCategoryID"));

const CategoryPage = () => {
	return (
		<div className="container py-6 pb-20">
			<CategoryHeader />
			<Tab
				tabs={[
					{
						label: "Live Channels",
						content: <LiveByCategoryID />,
					},
					{
						label: "Videos",
						content: <VODByCategoryID />,
					},
				]}
				className="mt-3"
			/>
		</div>
	);
};

export default CategoryPage;
