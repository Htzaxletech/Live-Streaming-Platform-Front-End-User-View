import Heading from "@components/ui/Heading";
import ShowMoreButton from "@components/ui/ShowMoreButton";
import { endpoints as ep } from "@services/endpoints";
import { makeRequest } from "@services/utils";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moskov from "@assets/images/moskov.jpg";
import Tag from "@components/ui/Tag";
import { Link, useParams } from "react-router-dom";

interface CategoryDataType {
	categoryName: string
	secondCategory: [];
}

const SearchByCategory: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [categories, setCategories] = useState<CategoryDataType[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [pageSize, setPageSize] = useState<number>(10);
	const [showMoreButton, setShowMoreButton] = useState(true);

	const { searchKeyword } = useParams();

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
	}, [searchKeyword]);

	const handleShowMore = async (signal: unknown, isClick: boolean) => {
		setLoading(true);
		const page = isClick ? currentPage + 1 : 0;

		try {
			const reqData = { keyword: searchKeyword, page, pageSize };

			const { success, message, data } = await makeRequest(
				"get",
				ep.searchByCategory,
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
			{categories && categories.length > 0 && (
				<div className="mt-8">
					<Heading size="sm" className="mb-6">
						Categories
					</Heading>

					{categories?.map((data, index) => (
						<div key={index} className="flex flex-col sm:flex-row mb-10">
							<div className="w-full sm:w-60 h-40 flex justify-center mb-4 sm:mb-0">
								<div className="border">
									<div className="relative bg-white max-h-full w-32 h-40">
										<img
											className="block w-full h-full object-cover"
											alt="pubhaxyisv"
											src={data?.s3categoryImage || moskov}
										/>
									</div>
								</div>
							</div>
							<div className="w-full sm:flex sm:flex-col sm:justify-center">
								<Heading className="text-xl">
									<Link to={`/directory/category/${data?.ID}`}>
										{data?.categoryName}
									</Link>
								</Heading>
								<div className="mt-3">
									{data?.secondCategory?.map((i, index) => {
										return (
											<Tag
												key={index}
												to={"/directory"}
												state={{ directory: { ...i, active: 0 } }}
											>
												{i.categoryName}
											</Tag>
										);
									})}
								</div>
							</div>
						</div>
					))}

					{showMoreButton && (
						<ShowMoreButton
							title={"Categories"}
							onClick={() => handleShowMore(null, true)}
							loading={loading}
						/>
					)}
				</div>
			)}
		</>
	);
};

export default SearchByCategory;
