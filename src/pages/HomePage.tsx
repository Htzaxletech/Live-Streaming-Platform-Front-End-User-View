// import HomeCarousel from "@components/shared/HomeCarousel";
import LivePage from "./LivePage";
import CategoryCardList from "./CategoryCardListPage";
import { endpoints as ep } from "@services/endpoints";
import { lazy } from "react";
import { useTranslation } from "react-i18next";

const HomeCarousel = lazy(() => import("@components/shared/HomeCarousel"));

const HomePage = () => {
	const { t } = useTranslation();

	return (
		<div className="container mx-auto py-10 pb-16 px-4">
			<div className="hidden md:block">
				<HomeCarousel />
			</div>

			<LivePage url={ep.homeLive} title={t("pages.lc")} />
			<CategoryCardList url={ep.homeCategory} />
		</div>
	);
};

export default HomePage;
