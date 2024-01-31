import Tab from "@components/ui/Tab";
import React, { lazy } from "react";
import CategoryCardList from "./CategoryCardListPage";
import LivePage from "./LivePage";
import Heading from "@components/ui/Heading";
import { endpoints } from "@services/endpoints";
import store from "store2";
import { useTranslation } from "react-i18next";

const ChannelList = lazy(() => import("@pages/ChannelListPage"));

const FollowingPage: React.FC = () => {
	// const { users } = useSelector((state) => state.user);
	const { t } = useTranslation();

	return (
		<div className="container mt-9 pb-20">
			<Heading size="lg">{t("navbar.link1")}</Heading>
			<Tab
				tabs={[
					{
						label: t("pages.overview"),
						content: (
							<>
								<LivePage
									url={endpoints.homeLive}
									title={t("pages.lc")}
								/>
								<CategoryCardList url={endpoints.homeCategory} />
							</>
						),
					},
					{
						label: t("pages.live"),
						content: (
							<LivePage
								url={endpoints.followLive}
								userID={store.get("id")}
								title={t("pages.lc")}
							/>
						),
					},
					{
						label: t("pages.videos"),
						content: (
							<LivePage
								url={endpoints.vodList}
								userID={store.get("id")}
								title={t("pages.lv")}
							/>
						),
					},
					{
						label: t("pages.categories"),
						content: (
							<CategoryCardList
								url={endpoints.followCategory}
								userID={store.get("id")}
							/>
						),
					},
					{
						label: t("pages.channels"),
						content: <ChannelList />,
					},
				]}
				className="mt-3"
			/>
		</div>
	);
};

export default FollowingPage;
