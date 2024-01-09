import CategoryHeader from "@components/shared/CategoryHeader";
import Tab from "@components/ui/Tab";
import CategoryCardList from "./CategoryCardListPage";
import LivePage from "./LivePage";

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
						content: <CategoryCardList />,
					},
				]}
				className="mt-3"
			/>
		</div>
	);
};

export default CategoryPage;
