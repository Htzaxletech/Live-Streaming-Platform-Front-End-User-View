import CategoryCard from "@components/shared/CategoryCard";
import Heading from "@components/ui/Heading";
import ShowMoreButton from "@components/ui/ShowMoreButton";
import { endpoints } from "@services/endpoints";
import { makeRequest } from "@services/utils";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface CategoryProps {
	keyword?: string
}

interface CategoryDataType {

}

const BrowseCategoryList: React.FC<CategoryProps> = ({ keyword }) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [categories, setCategories] = useState<CategoryDataType[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [pageSize, setPageSize] = useState<number>(10);
	const [showMoreButton, setShowMoreButton] = useState(true);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		(async () => {
			handleShowMore(signal, false);
		})();

		return () => {
			setCategories([]);
			setCurrentPage(0);
			setPageSize(10);
			setShowMoreButton(true);
			abortController.abort();
		};
	}, [keyword]);

	const handleShowMore = async (signal: unknown, isClick: boolean) => {
		setLoading(true);
		const page = isClick ? currentPage + 1 : 0;

		try {
			const reqData = { filter: keyword, page, pageSize };

			const { success, message, data } = await makeRequest(
				"get",
				endpoints.secondCategory,
				reqData,
				{
					signal,
				}
			);

			if (success) {
				if (data?.length > 0) {
					setCategories((prevState) => [...prevState, ...data]);
				} else {
					setShowMoreButton(false);
				}

				if (isClick) setCurrentPage((prevPage) => prevPage + 1);
			} else {
				toast.error(message);
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setShowMoreButton(false);
		}
	};

	return (
		<>
			{categories.length > 0 && (
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
							onClick={() => handleShowMore(null, true)}
							loading={loading}
						/>
					)}
				</div>
			)}
		</>
	);
};

export default BrowseCategoryList;
