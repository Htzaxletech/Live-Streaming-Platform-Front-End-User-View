import SearchByCategory from "./SearchByCategory";
import SearchByChannel from "./SearchByChannel";
import SearchByLive from "./SearchByLive";
import SearchByVOD from "./SearchByVOD";
import SearchByCategoryTag from "./SearchByCategoryTag";
import SearchByVODTag from "./SearchByVODTag";
import SearchByLiveTag from "./SearchByLiveTag";

const SearchPage = () => {
	return (
		<div className="container py-6">
			<SearchByCategory />
			<SearchByChannel />
			<SearchByLive />
			<SearchByVOD />
			<SearchByCategoryTag />
			<SearchByVODTag />
			<SearchByLiveTag />
		</div>
	);
};

export default SearchPage;
