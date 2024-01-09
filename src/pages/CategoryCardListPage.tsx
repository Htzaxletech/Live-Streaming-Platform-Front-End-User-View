import CategoryCard from "@components/shared/CategoryCard";
import Heading from "@components/ui/Heading";
import ShowMoreButton from "@components/ui/ShowMoreButton";

const CategoryCardList = () => {
	return (
		<div className="mt-8">
			<Heading size="sm">Categories</Heading>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-8 gap-2 mt-3 mb-8">
				{Array.from({ length: 13 }).map((_, index) => (
					<CategoryCard key={index} />
				))}
			</div>

			<ShowMoreButton title={""} />
		</div>
	);
};

export default CategoryCardList;
