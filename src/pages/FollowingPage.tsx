import Tab from "@components/ui/Tab";
import React from "react";
import CategoryCardList from "./CategoryCardListPage";
import LivePage from "./LivePage";
import Heading from "@components/ui/Heading";

const FollowingPage: React.FC = () => {
	// const { users } = useSelector((state) => state.user);

	return (
		<div className="container mt-9 pb-20">
			<Heading size="lg">Following</Heading>
			<Tab
				tabs={[
					{
						label: "Overview",
						content: <CategoryCardList />,
					},
					{
						label: "Live",
						content: <LivePage />,
					},
					{
						label: "Videos",
						content: <CategoryCardList />,
					},
					{
						label: "Categories",
						content: <CategoryCardList />,
					},
					{
						label: "Channels",
						content: <LivePage />,
					},
				]}
				className="mt-3"
			/>
		</div>
	);
};

export default FollowingPage;
