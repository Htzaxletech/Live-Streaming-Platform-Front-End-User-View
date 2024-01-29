/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import CategoryCard from "@components/shared/CategoryCard";
import Heading from "@components/ui/Heading";
import ShowMoreButton from "@components/ui/ShowMoreButton";
import { endpoints } from "@services/endpoints";
import { makeRequest } from "@services/utils";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CategoryListByMainCategoryID: React.FC = () => {
	interface CategoryDataType {}
	const { t } = useTranslation();
	const { dirCategoryName } = useParams();
	const { state } = useLocation();

	const [loading, setLoading] = useState<boolean>(false);
	const [categoryData, setCategoryData] = useState<CategoryDataType[]>([]);
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
			setCategoryData([]);
			setCurrentPage(0);
			setPageSize(10);
			setShowMoreButton(true);
			abortController.abort();
		};
	}, [dirCategoryName]);

	const handleShowMore = async (signal: unknown, isClick: boolean) => {
		setLoading(true);
		const page = isClick ? currentPage + 1 : 0;

		try {
			const reqData = { catID: state?.categoryState?.ID, page, pageSize };

			const { success, message, data } = await makeRequest(
				"get",
				endpoints.browseCategoryByMainID,
				reqData,
				{
					signal,
				}
			);

			if (success) {
				if (data?.length > 0) {
					setCategoryData((prevState) => [...prevState, ...data]);
				} else {
					setShowMoreButton(false);
				}

				if (isClick) setCurrentPage((prevPage) => prevPage + 1);
			} else {
				// toast.error(message);
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setShowMoreButton(false);
		}
	};

	return (
		<div className="mt-8">
			<Heading size="sm" className="my-2 text-gray-900 dark:text-gray-100">
				{t("pages.categories")}
			</Heading>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-8 gap-2 mt-3 mb-8">
				{categoryData &&
					categoryData.length > 0 &&
					categoryData?.map((data, index) => (
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
	);
};

export default CategoryListByMainCategoryID;
