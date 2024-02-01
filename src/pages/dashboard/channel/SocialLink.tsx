/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@components/ui/Button";
import Heading from "@components/ui/Heading";
import Input from "@components/ui/Input";
import * as Label from "@radix-ui/react-label";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { makeRequest } from "@services/utils";
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

const SocialLink: React.FC = () => {
	const { t } = useTranslation();
	const [loading, setLoading] = useState<boolean>(false);
	const [socialData, setSocialData] = useState<any>({
		title: "",
		link: "",
	});

	const [socialList, setSocialList] = useState<any[]>([
		{ id: 1, title: "Facebook", link: "https://www.facebook.com/" },
		{ id: 2, title: "Skype", link: "https://web.skype.com/" },
		{ id: 3, title: "Twitch", link: "https://www.twitch.tv/" },
		{ id: 4, title: "Instagram", link: "https://www.instagram.com/" },
		{ id: 5, title: "Youtube", link: "https://www.youtube.com/" },
		{ id: 6, title: "Pinterest", link: "https://www.pinterest.de/" },
		{ id: 7, title: "Tiktok", link: "https://www.tiktok.com/en/" },
		{ id: 8, title: "Telegram", link: "https://telegram.org/" },
		{ id: 9, title: "Discord", link: "https://discord.com/" },
		{ id: 10, title: "Twitter", link: "https://twitter.com/" },
		{ id: 11, title: "Axle Tech", link: "https://axletechmm.com/" },
	]);

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

	const handleAdd = () => {
		setLoading(true);
		console.table(socialData);

		setTimeout(() => {
			const newList = [...socialList, socialData];
			setSocialList(newList);

			setSocialData({
				title: "",
				link: "",
			});
			setLoading(false);
		}, 3000);
	};

	return (
		<div className="mb-7">
			<Heading size="sm">{t("pages.sl")}</Heading>
			<div className="bg-background-base border dark:border-gray-700 p-5 rounded-md mt-2">
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

				<div className="flex w-full justify-end mt-4">
					{!loading &&
					socialData.title !== "" &&
					socialData.link !== "" ? (
						<Button
							className="py-5"
							color="primary"
							onClick={handleAdd}
							disabled={
								loading ||
								socialData.title === "" ||
								socialData.link === ""
							}
						>
							{loading ? "Loading..." : t("pages.add")}
						</Button>
					) : (
						<Button className="py-5" color="default" disabled>
							{loading ? "Loading..." : t("pages.add")}
						</Button>
					)}
				</div>

				{socialList.length > 0 && (
					<>
						<hr className="mt-6" />

						<ul className="mt-6 flex flex-col gap-2">
							{socialList.map((item, index) => (
								<li
									key={index}
									className="flex justify-between items-center py-5 pl-4 lg:pl-7 pr-4 bg-background-body rounded-lg"
								>
									<div className="flex items-center">
										<div className="mr-4 md:mr-6">
											{getIconForUrl(item.link)}
										</div>
										<div>
											<div className="font-semibold">
												{item.title}
											</div>
											<div className="text-xs">{item.link}</div>
										</div>
									</div>
									<div className="flex">
										<a
											data-tooltip-id="my-tooltip"
											data-tooltip-content={t("pages.edit")}
											className="z-50"
										>
											<Button
												className="bg-transparent p-0"
												// onClick={() => handleEdit(index)}
											>
												<LuPencil className="md:text-lg" />
											</Button>
										</a>

										<a
											data-tooltip-id="my-tooltip"
											data-tooltip-content={t("pages.remove")}
											className="z-50"
										>
											<Button
												className="bg-transparent p-0"
												// onClick={() => handleDelete(index)}
											>
												<FaRegTrashAlt className="md:text-lg" />
											</Button>
										</a>
									</div>
								</li>
							))}
						</ul>
					</>
				)}
			</div>
		</div>
	);
};

export default SocialLink;
