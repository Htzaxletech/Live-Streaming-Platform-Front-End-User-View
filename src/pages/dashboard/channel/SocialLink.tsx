/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import Button from "@components/ui/Button";
import Heading from "@components/ui/Heading";
import Input from "@components/ui/Input";
import * as Label from "@radix-ui/react-label";
import { endpoints } from "@services/endpoints";
import { makeRequest } from "@services/utils";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CiLink } from "react-icons/ci";
import {
	FaFacebook,
	FaSkype,
	FaRegTrashAlt,
	FaTwitch,
	FaInstagram,
	FaYoutube,
	FaPinterest,
	FaTiktok,
	FaTelegram,
	FaDiscord,
	FaTwitter,
} from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { toast } from "react-toastify";

interface SocialProps {
	channelID?: number;
}

const SocialLink: React.FC<SocialProps> = ({ channelID }) => {
	const { t } = useTranslation();
	const [loading, setLoading] = useState<boolean>(false);
	const [loading1, setLoading1] = useState<boolean>(false);
	const [loading2, setLoading2] = useState<boolean>(false);
	const [socialData, setSocialData] = useState<any>({
		title: "",
		link: "",
	});

	const [socialList, setSocialList] = useState<any[]>([]);

	const iconMapping: { [key: string]: React.ElementType } = {
		facebook: FaFacebook,
		skype: FaSkype,
		twitch: FaTwitch,
		instagram: FaInstagram,
		youtube: FaYoutube,
		pinterest: FaPinterest,
		tiktok: FaTiktok,
		telegram: FaTelegram,
		discord: FaDiscord,
		twitter: FaTwitter,
	};

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		if (channelID) {
			(async () => {
				try {
					const reqData = {
						channelID: channelID,
					};

					const response = await makeRequest(
						"get",
						endpoints.getSocial,
						reqData,
						{
							signal,
						}
					);

					if (response?.success) {
						setSocialList(response?.data);
					} else {
						toast.error(response?.message);
					}
					setLoading(false);
				} catch (error) {
					setLoading(false);
				}
			})();
		}

		return () => {
			abortController.abort();
		};
	}, [channelID]);

	const getIconForUrl = (url: string) => {
		try {
			const domain = new URL(url).hostname;
			const matchedDomain = Object.keys(iconMapping).find((key) =>
				domain.includes(key)
			);
			const IconComponent = matchedDomain
				? iconMapping[matchedDomain]
				: CiLink;
			return <IconComponent size={19} />;
		} catch (error) {
			return <CiLink />;
		}
	};

	const handleInputChange =
		(key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
			setSocialData((prev: any) => ({
				...prev,
				[key]: e.target.value,
			}));
		};

	const handleAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setLoading(true);

		try {
			const reqData = {
				channelID: channelID,
				title: socialData.title,
				links: socialData.link,
			};

			const { success, message } = await makeRequest(
				"post",
				endpoints.createSocial,
				reqData
			);

			if (success) {
				toast.success(message);

				setSocialData({
					title: "",
					link: "",
				});

				await getSocialLinks();
			} else {
				toast.error(message);
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	const getSocialLinks = async () => {
		if (channelID) {
			try {
				const reqData = {
					channelID: channelID,
				};

				const { success, message, data } = await makeRequest(
					"get",
					endpoints.getSocial,
					reqData
				);

				if (success) {
					setSocialList(data);
				} else {
					toast.error(message);
				}
			} catch (error) {
				console.error(error);
			}
		}
	};

	const toggleEdit = (index: number) => {
		setSocialList((prevList) => {
			const newList = [...prevList];
			newList[index].editStatus = !newList[index].editStatus;
			return newList;
		});
	};

	const handleEditInputChange = (index: number, field: string, value: any) => {
		setSocialList((prevList) => {
			const newList = [...prevList];
			newList[index][field] = value;
			return newList;
		});
	};

	const handleSave = async (index: number) => {
		setLoading1(true);

		const newList = [...socialList];
		const { ID, title, links } = newList[index];

		try {
			const reqData = {
				social_id: ID,
				title,
				links,
			};

			const { success, message } = await makeRequest(
				"post",
				endpoints.updateSocial,
				reqData
			);

			if (success) {
				toast.success(message);
			} else {
				toast.error(message);
			}
			setLoading1(false);
		} catch (error) {
			setLoading1(false);
		}
		await getSocialLinks();
	};

	const handleDelete = async (index: number) => {
		setLoading2(true);

		const newList = [...socialList];
		const { ID } = newList[index];

		try {
			const reqData = {
				social_id: ID,
			};

			const { success, message } = await makeRequest(
				"post",
				endpoints.deleteSocial,
				reqData
			);

			if (success) {
				toast.success(message);
			} else {
				toast.error(message);
			}
			setLoading2(false);
		} catch (error) {
			setLoading2(false);
		}

		await getSocialLinks();
	};

	return (
		<div className="mb-7">
			<Heading size="sm">{t("pages.sl")}</Heading>
			<div className="bg-background-base border dark:border-gray-700 p-5 rounded-md mt-2">
				<form onSubmit={handleAdd}>
					<div className="flex flex-col gap-2">
						<Label.Root className="font-semibold" htmlFor="link_title">
							{t("pages.ltt")}
						</Label.Root>
						<Input
							id="link_title"
							className="flex-shrink w-full"
							value={socialData.title}
							onChange={handleInputChange("title")}
						/>
					</div>

					<div className="flex flex-col gap-2 mt-5">
						<Label.Root className="font-semibold" htmlFor="link_url">
							{t("pages.lu")}
						</Label.Root>
						<Input
							startContent={<CiLink />}
							id="link_url"
							className="flex-shrink w-full"
							value={socialData.link}
							onChange={handleInputChange("link")}
						/>
					</div>

					{socialList.length < 5 && (
						<div className="flex w-full justify-end mt-4">
							<Button
								color="primary"
								type="submit"
								// onClick={handleAdd}
								disabled={
									loading ||
									socialData.title === "" ||
									socialData.link === ""
								}
							>
								{loading ? "Loading..." : t("pages.add")}
							</Button>
						</div>
					)}
				</form>

				{socialList.length > 0 && (
					<>
						<hr className="mt-6" />

						<ul className="mt-6 flex flex-col gap-2">
							{socialList.map((item, index) => {
								if (!("editStatus" in item)) {
									item.editStatus = false;
								}

								return (
									<li
										key={index}
										className="flex justify-between items-center gap-3 py-5 pl-4 lg:pl-7 pr-4 bg-background-body rounded-lg"
									>
										<div className="flex items-center w-full">
											{!item.editStatus && (
												<div className="mr-4 md:mr-6">
													{getIconForUrl(item.links)}
												</div>
											)}
											<div className="w-full flex flex-col gap-1">
												{!item.editStatus ? (
													<div className="font-semibold">
														{item.title}
													</div>
												) : (
													<Input
														size="sm"
														className="w-full"
														value={item.title}
														onChange={(e) =>
															handleEditInputChange(
																index,
																"title",
																e.target.value
															)
														}
													/>
												)}

												{!item.editStatus ? (
													<div className="text-xs">
														{item.links}
													</div>
												) : (
													<Input
														startContent={getIconForUrl(
															item.links
														)}
														size="sm"
														className="w-full"
														value={item.links}
														onChange={(e) =>
															handleEditInputChange(
																index,
																"links",
																e.target.value
															)
														}
													/>
												)}
											</div>
										</div>
										<div className="flex gap-1">
											{item.editStatus ? (
												<div className="flex gap-2">
													<Button
														color="primary"
														onClick={() => handleSave(index)}
														disabled={loading1}
													>
														{loading1
															? "Loading..."
															: t("pages.save")}
													</Button>
													<Button
														onClick={() => toggleEdit(index)}
													>
														{t("pages.cancel")}
													</Button>
												</div>
											) : (
												<a
													data-tooltip-id="my-tooltip"
													data-tooltip-content={t("pages.edit")}
													className="z-50"
												>
													<Button
														className="bg-transparent p-0"
														onClick={() => toggleEdit(index)}
													>
														<LuPencil className="md:text-lg" />
													</Button>
												</a>
											)}

											<a
												data-tooltip-id="my-tooltip"
												data-tooltip-content={t("pages.remove")}
												className="z-50"
											>
												<Button
													className="bg-transparent p-0"
													onClick={() => handleDelete(index)}
													disabled={loading2}
												>
													<FaRegTrashAlt className="md:text-lg" />
												</Button>
											</a>
										</div>
									</li>
								);
							})}
						</ul>
					</>
				)}
			</div>
		</div>
	);
};

export default SocialLink;
