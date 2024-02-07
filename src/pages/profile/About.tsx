/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import Heading from "@components/ui/Heading";
import { CiLink } from "react-icons/ci";
import {
	FaDiscord,
	FaFacebook,
	FaInstagram,
	FaPinterest,
	FaSkype,
	FaTelegram,
	FaTiktok,
	FaTwitch,
	FaTwitter,
	FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { makeRequest } from "@services/utils";
import { toast } from "react-toastify";
import { endpoints } from "@services/endpoints";

const About = ({ channelData }) => {
	const [socialData, setSocialData] = useState<[]>([]);

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

		(async () => {
			try {
				const reqData = {
					channelID: channelData?.channelID,
				};

				const { success, message, data } = await makeRequest(
					"get",
					endpoints.getSocial,
					reqData,
					{
						signal,
					}
				);

				if (success) {
					setSocialData(data);
				} else {
					toast.error(message);
				}
			} catch (error) {
				console.error(error);
			}
		})();

		return () => {
			abortController.abort();
		};
	}, [channelData]);

	const getIconForUrl = (url: string) => {
		try {
			const domain = new URL(url).hostname;
			const matchedDomain = Object.keys(iconMapping).find((key) =>
				domain.includes(key)
			);
			const IconComponent = matchedDomain
				? iconMapping[matchedDomain]
				: CiLink;
			return <IconComponent className="me-2" size={19} />;
		} catch (error) {
			return <CiLink className="me-2" />;
		}
	};

	return (
		<>
			<div className="bg-background-base rounded-xl px-8 py-6 mx-28">
				<Heading>About {channelData?.displayName}</Heading>
				<p className="flex text-foreground-secondary my-2">
					<span className="font-semibold mr-1">
						{channelData?.followers?.[0]?.follower}
					</span>
					{channelData?.followers?.[0]?.follower > 1
						? "followers"
						: "follower"}
				</p>
				<p className="hidden md:flex text-foreground-secondary mb-3">
					{channelData?.bio}
				</p>

				{socialData?.length > 0 && (
					<>
						<hr></hr>
						<div className="mt-4">
							<ul className="flex flex-wrap gap-3">
								{socialData?.map((i, index) => {
									return (
										<li key={index} className="flex items-center">
											<Link
												to={i.links}
												target="_blank"
												rel="noopener noreferrer"
											>
												<div className="flex justify-center items-center text-foreground-secondary text-sm">
													{getIconForUrl(i.links)}
													{i.title}
												</div>
											</Link>
										</li>
									);
								})}
							</ul>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default About;
