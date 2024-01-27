import Tab from "@components/ui/Tab";
import React, { lazy } from "react";
import CategoryCardList from "./CategoryCardListPage";
import LivePage from "./LivePage";
import Heading from "@components/ui/Heading";
import { endpoints } from "@services/endpoints";
import store from "store2";

const ChannelList = lazy(() => import("@pages/ChannelListPage"));

const FollowingPage: React.FC = () => {
	// const { users } = useSelector((state) => state.user);

	return (
		<div className="container mt-9 pb-20">
			<Heading size="lg">Following</Heading>
			<Tab
				tabs={[
					{
						label: "Overview",
						content: (
							<>
								<LivePage
									url={endpoints.homeLive}
									title="Live Channels"
								/>
								<CategoryCardList url={endpoints.homeCategory} />
							</>
						),
					},
					{
						label: "Live",
						content: (
							<LivePage
								url={endpoints.followLive}
								userID={store.get("id")}
								title="Live Channels"
							/>
						),
					},
					{
						label: "Videos",
						content: (
							<LivePage
								url={endpoints.vodList}
								userID={store.get("id")}
								title="Latest Videos"
							/>
						),
					},
					{
						label: "Categories",
						content: (
							<CategoryCardList
								url={endpoints.followCategory}
								userID={store.get("id")}
							/>
						),
					},
					{
						label: "Channels",
						content: <ChannelList />,
					},
				]}
				className="mt-3"
			/>
		</div>
	);
};

export default FollowingPage;
