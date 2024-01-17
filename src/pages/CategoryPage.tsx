import { lazy } from "react";

const LivePage = lazy(() => import("./LivePage"));
const VideosPage = lazy(() => import("./VideosPage"));
const Tab = lazy(() => import("@components/ui/Tab"));
const CategoryHeader = lazy(() => import("@components/shared/CategoryHeader"));

const CategoryPage = () => {
	return (
		<div className="container py-6 pb-20">
			<CategoryHeader />
			<Tab
				tabs={[
					{
						label: "Live Channels",
						content: <LivePage />,
					},
					{
						label: "Videos",
						content: <VideosPage />,
					},
				]}
				className="mt-3"
			/>
		</div>
	);
};

export default CategoryPage;
