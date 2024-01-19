import CategoryCard from "@components/shared/CategoryCard";
import Heading from "@components/ui/Heading";
import ShowMoreButton from "@components/ui/ShowMoreButton";
import { makeRequest } from "@services/utils";
import { useEffect, useState } from "react";
import { endpoints as ep } from "@services/endpoints";
import { toast } from "react-toastify";

const CategoryCardList = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [categories, setCategories] = useState<[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [pageSize] = useState<number>(10);
	const [showMoreButton, setShowMoreButton] = useState(true);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		(async () => {
			handleShowMore(signal);
		})();

		return () => {
			abortController.abort();
		};
	}, []);

	const handleShowMore = async (signal: unknown) => {
		setLoading(true);

		try {
			const data = {
				page: currentPage,
				pageSize,
			};

			const response = await makeRequest("get", ep.homeCategory, data, {
				signal,
			});

			if (response?.success) {
				const moreData = response?.data;

				if (moreData.length > 0) {
					setCategories((prevState) => [...prevState, ...moreData]);
				} else {
					setShowMoreButton(false);
				}

				setCurrentPage((prevPage) => prevPage + 1);
			} else {
				toast.error(response?.message);
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setShowMoreButton(false);
		}
	};

	return (
		<div className="mt-8">
			<Heading size="sm">Categories</Heading>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-8 gap-2 mt-3 mb-8">
				{categories &&
					categories.length > 0 &&
					categories?.map((data, index) => (
						<CategoryCard key={index} data={data} />
					))}
			</div>

			{showMoreButton && (
				<ShowMoreButton
					title={""}
					onClick={() => handleShowMore(null)}
					loading={loading}
				/>
			)}
		</div>
	);
};

export default CategoryCardList;
