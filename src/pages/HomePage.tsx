import HomeCarousel from "@components/shared/HomeCarousel";
import LivePage from "./LivePage";
import CategoryCardList from "./CategoryCardListPage";

const HomePage = () => {
	return (
		<div className="container mx-auto py-10 pb-16 px-4">
			<div className="hidden md:block">
				<HomeCarousel />
			</div>

			<LivePage />
			<CategoryCardList />
		</div>
	);
};

export default HomePage;
