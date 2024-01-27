import VideoCard from "@components/shared/VideoCard";
import Heading from "@components/ui/Heading";
import ShowMoreButton from "@components/ui/ShowMoreButton";
import { endpoints } from "@services/endpoints";
import { makeRequest } from "@services/utils";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const LiveListByMainCategoryID: React.FC = () => {
	
	interface LiveDataType {}

	const { dirCategoryName } = useParams();
	const { state } = useLocation();

	const [loading, setLoading] = useState<boolean>(false);
	const [liveData, setLiveData] = useState<LiveDataType[]>([]);
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
			setLiveData([]);
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
				endpoints.browseLiveByMainID,
				reqData,
				{
					signal,
				}
			);

			if (success) {
				if (data?.length > 0) {
					setLiveData((prevState) => [...prevState, ...data]);
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
		<>
			{liveData.length > 0 && (
				<div className="mt-8">
					<Heading
						size="sm"
						className="my-2 text-gray-900 dark:text-gray-100"
					>
						Lives
					</Heading>

					<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-3 mt-3 mb-4">
						{liveData?.map((data, index) => (
							<VideoCard key={index} data={data} />
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

export default LiveListByMainCategoryID;
