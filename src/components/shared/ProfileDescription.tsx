/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Heading from "@components/ui/Heading";
import { CiLink } from "react-icons/ci";
import { FaCheck, FaDiscord, FaFacebook, FaInstagram, FaPinterest, FaSkype, FaTelegram, FaTiktok, FaTwitch, FaTwitter, FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface ProfileDescriptionProps {
	streamerName: string;
	followerCount: string;
	description: string;
	socialLinks: []
}

const ProfileDescription: React.FC<ProfileDescriptionProps> = ({
	streamerName,
	followerCount,
	description,
	socialLinks,
}) => {
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
	
	return (
		<div className="container bg-background-float">
			<div className="flex flex-col p-5 pb-3 lg:p-10 lg:pb-8">
				<div className="">
					<div className="flex justify-start items-center mb-1 md:mb-3 lg:mb-4">
						<Heading className="text-foreground  text-lg md:text-2xl">
							About {streamerName}
						</Heading>
						<span className="inline-block bg-primary rounded-full border-2 border-primary ms-2">
							<FaCheck className="text-xs " />
						</span>
					</div>
					<div>
						<b className="mr-1">{followerCount}</b>
						<span className="text-foreground-secondary font-light">
							{followerCount > 1 ? "followers" : "follower"}
						</span>
					</div>
					<p className="text-foreground-secondary font-light">
						{description}
					</p>
				</div>
				<div className="mt-5 mb-3 bg-background-base border-b-2"></div>
				<div>
					<ul className="flex flex-wrap gap-3">
						{socialLinks.length > 0 &&
							socialLinks.map((i, index) => {
								return (
									<li key={index} className="flex items-center">
										<Link
											to={i.links}
											target="_blank"
											rel="noopener noreferrer"
										>
											<div className="flex justify-center items-center text-foreground-secondary text-sm py-2">
												{getIconForUrl(i.links)}
												{i.title}
											</div>
										</Link>
									</li>
								);
							})}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ProfileDescription;
