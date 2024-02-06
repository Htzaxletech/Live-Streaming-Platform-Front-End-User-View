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
import angela from "@assets/images/angela.jpg";
import Tag from "@components/ui/Tag";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ChannelDataType {
	displayName: string;
	followers: [];
	tags: [];
}

const SearchByChannel: React.FC = () => {
	const { t } = useTranslation();
	const [loading, setLoading] = useState<boolean>(false);
	const [channel, setChannel] = useState<ChannelDataType[]>([]);
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
			setChannel([]);
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
				ep.searchByChannel,
				reqData,
				{
					signal,
				}
			);

			if (success) {
				if (data?.length > 0) {
					setChannel((prevState) => [...prevState, ...data]);
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
			{channel && channel.length > 0 && (
				<div className="mt-8">
					<Heading size="sm" className="mb-6">
						{t("pages.channels")}
					</Heading>

					{channel?.map((data, index) => (
						<div key={index} className="flex flex-col sm:flex-row mb-10">
							<div className="w-full sm:w-60 h-32 flex justify-center mb-4 sm:mb-0">
								<div className="rounded-full overflow-hidden border">
									<div className="relative bg-transparent max-h-full w-32 h-32">
										<img
											className="block rounded-full h-full w-full"
											alt="pubhaxyisv"
											src={data?.s3channel || angela}
										/>
									</div>
								</div>
							</div>
							<div className="w-full sm:flex sm:flex-col sm:justify-center">
								<Heading className="text-xl">
									<Link to={`/profile/${data?.userID}`}>
										{data?.displayName}
									</Link>
								</Heading>
								<p className="text-sm mt-1">
									{data?.followers[0]?.follower} Followers
								</p>
								<div className="mt-3 flex gap-1 flex-wrap">
									{data?.tags?.map((i: any, index: number) => {
										return (
											<Tag key={index} to={""}>
												{i.tagName}
											</Tag>
										);
									})}
								</div>
							</div>
						</div>
					))}

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

export default SearchByChannel;
