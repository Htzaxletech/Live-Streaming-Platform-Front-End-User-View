/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import React, { useCallback } from "react";
import { CategoryLink } from "@components/ui/CategoryLink";
import { useEffect, useState } from "react";
import { makeRequest } from "@services/utils";
import { endpoints } from "@services/endpoints";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { convertToLowerCase } from "@utils/helpers";

const DirectoryCategory: React.FC = () => {
	interface CategoryDataType {}

	const [loading, setLoading] = useState<boolean>(false);
	const [categories, setCategories] = useState<CategoryDataType[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		(async () => {
			try {
				const reqData = {};

				const { success, message, data } = await makeRequest(
					"get",
					endpoints.mainCategory,
					reqData,
					{
						signal,
					}
				);

				if (success && data?.length > 0) {
					setCategories(data);
				} else {
					toast.error(message);
				}
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		})();

		return () => {
			abortController.abort();
		};
	}, []);

	const handleClick = useCallback((data: any) => {
		const categoryNameLowerCase = convertToLowerCase(data?.categoryName);
		if (categoryNameLowerCase) {
			navigate(`/directory/${categoryNameLowerCase}`, {
				state: {
					categoryState: data,
				},
			});
		}
	}, []);

	return (
		<>
			{categories?.length > 0 && (
				<div className="grid grid-flow-col auto-cols-max py-3 gap-2 overflow-auto">
					{categories?.map((i, index) => {
						return (
							<div key={index} onClick={() => handleClick(i)}>
								<CategoryLink
									to=""
									color="default"
									size="md"
									icon={<img src={i.s3path} alt="icon" />}
								>
									{i.categoryName}
								</CategoryLink>
							</div>
						);
					})}
				</div>
			)}
		</>
	);
};

export default DirectoryCategory;
