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

const About = ({ channelData }) => {
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
			return <IconComponent className="me-2" size={19} />;
		} catch (error) {
			return <CiLink className="me-2" />;
		}
	};

	const socialLinks = [
		{
			id: 1,
			title: "Facebook",
			link: "https://www.facebook.com/",
		},
		{ id: 2, title: "Skype", link: "https://web.skype.com/" },
		{ id: 3, title: "Twitch", link: "https://www.twitch.tv/" },
		{
			id: 4,
			title: "Instagram",
			link: "https://www.instagram.com/",
		},
		{
			id: 5,
			title: "Axle Tech",
			link: "https://axletechmm.com/",
		},
	];

	return (
		<>
			<div className="bg-background-base rounded-xl px-8 py-6 mx-28">
				<Heading>About {channelData?.displayName}</Heading>
				<p className="flex text-foreground-secondary my-2">
					<span className="font-semibold mr-1">
						{channelData?.followers?.[0]?.follower}
					</span>
					followers
				</p>
				<p className="hidden md:flex text-foreground-secondary mb-3">
					{channelData?.description}
				</p>

				<hr></hr>

				<div className="mt-4">
					<ul className="flex flex-wrap gap-3">
						{socialLinks.length > 0 &&
							socialLinks.map((i, index) => {
								return (
									<li key={index} className="flex items-center">
										<Link
											to={i.link}
											target="_blank"
											rel="noopener noreferrer"
										>
											<div className="flex justify-center items-center text-foreground-secondary text-sm">
												{getIconForUrl(i.link)}
												{i.title}
											</div>
										</Link>
									</li>
								);
							})}
					</ul>
				</div>
			</div>
		</>
	);
};

export default About;
