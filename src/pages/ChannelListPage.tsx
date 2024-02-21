/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import Heading from "@components/ui/Heading";
import ShowMoreButton from "@components/ui/ShowMoreButton";
import { endpoints as ep } from "@services/endpoints";
import { makeRequest } from "@services/utils";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import store from "store2";
import { VirtuosoGrid } from "react-virtuoso";
import {
	StyledItem,
	StyledList,
} from "@styles/style-components/ChannelListPage";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ChannelDataType {}

const ChannelListPage: React.FC = () => {
	// const navigate = useNavigate();
	const { t } = useTranslation();
	const [loading, setLoading] = useState<boolean>(false);
	const [channelList, setChannelList] = useState<ChannelDataType[]>([]);
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
			setChannelList([]);
			setCurrentPage(0);
			setPageSize(10);
			setShowMoreButton(true);
			abortController.abort();
		};
	}, []);

	const handleShowMore = async (signal: unknown, isClick: boolean) => {
		setLoading(true);
		const page = isClick ? currentPage + 1 : 0;

		try {
			const reqData = { userID: store.get("id"), page, pageSize };

			const { success, message, data } = await makeRequest(
				"get",
				ep.followChannelList,
				reqData,
				{
					signal,
				}
			);

			if (success) {
				console.log("Channel List Page Response", data);
				if (data?.length > 0) {
					setChannelList((prevState) => [...prevState, ...data]);
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

	const StyledListAsComponent = StyledList as React.FC;

	// const handleChannelClick = (index: any) => {
	// 	navigate(`/profile/${channelList[index]?.ID}`);
	// }

	return (
		<>
			{channelList && channelList.length > 0 && (
				<div className="mt-8">
					<Heading size="sm">{t("sidebar.followed")}</Heading>

					{/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-5 mb-5">
						{channelList.map((data, index) => (
							<div
								key={index}
								className="h-44 flex items-center justify-center rounded"
								style={{
									backgroundImage:
										'url("https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365")',
									backgroundSize: "cover",
									backgroundRepeat: "no-repeat",
								}}
							>
								<div className="text-center">
									<img
										className="mx-auto w-16 h-16 rounded-full object-cover"
										src="https://kpopping.com/documents/0b/1/1800/230409-JISOO-FLOWER-at-INKIGAYO-documents-1.jpeg?v=0e47f"
										alt="Profile"
									/>
									<Heading className="text-sm">
										{data?.displayName}
									</Heading>
								</div>
							</div>
						))}
					</div> */}

					<VirtuosoGrid
						style={{ marginTop: 20, marginBottom: 20 }}
						totalCount={channelList.length}
						overscan={5}
						// listClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-5 mb-5"
						// itemClassName="h-44 flex items-center justify-center rounded"
						useWindowScroll
						components={{
							List: StyledListAsComponent,
						}}
						itemContent={(index) => (
							<Link to={`/profile/${channelList[index]?.userID}`}>
								<StyledItem
									key={index}
									// backgroundImage="https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365"
									backgroundImage={channelList[index]?.s3channelbanner}
								>
									<div>
										<img
											// src="https://kpopping.com/documents/0b/1/1800/230409-JISOO-FLOWER-at-INKIGAYO-documents-1.jpeg?v=0e47f"
											src={channelList[index]?.s3channelprofile}
											alt="Profile"
											loading="lazy"
										/>
										<Heading className="text-sm">
											{channelList[index]?.displayName}
										</Heading>
									</div>
								</StyledItem>
							</Link>
						)}
					/>

					{showMoreButton && (
						<ShowMoreButton
							title={t("pages.channels")}
							onClick={() => handleShowMore(null, true)}
							loading={loading}
						/>
					)}
				</div>
			)}
		</>
	);
};

export default ChannelListPage;
