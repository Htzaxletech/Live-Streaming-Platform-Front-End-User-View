// import HomeCarousel from "@components/shared/HomeCarousel";
import LivePage from "./LivePage";
import CategoryCardList from "./CategoryCardListPage";
import { endpoints as ep } from "@services/endpoints";
import { lazy } from "react";

const HomeCarousel = lazy(() => import("@components/shared/HomeCarousel"));

const HomePage = () => {
	return (
		<div className="container mx-auto py-10 pb-16 px-4">
			<div className="hidden md:block">
				<HomeCarousel />
			</div>

			<LivePage url={ep.homeLive} title="Live Channels" />
			<CategoryCardList url={ep.homeCategory} />
		</div>
	);
};

export default HomePage;
