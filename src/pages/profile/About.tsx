/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck

import Heading from "@components/ui/Heading";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const About = ({ channelData }) => {
	const socialLinks = {
		facebook: "www.facebook.com/username",
		instagram: "www.instagram.com/username",
		youtube: "www.youtube.com/username",
	};

	const getIcon = (platform: string) => {
		switch (platform) {
			case "youtube":
				return (
					<div className="flex justify-center items-center text-foreground-secondary text-sm">
						<FaYoutube className="text-lg me-1" /> Youtube Channel
					</div>
				);
			case "facebook":
				return (
					<div className="flex justify-center items-center text-foreground-secondary text-sm">
						<FaFacebook className="text-lg me-1" /> Facebook
					</div>
				);
			case "instagram":
				return (
					<div className="flex justify-center items-center text-foreground-secondary text-sm">
						<FaInstagram className="text-lg me-1" /> Instagram
					</div>
				);

			default:
				return null;
		}
	};

	return (
		<>
			<div className="bg-background-base rounded-xl px-8 py-6 mx-28">
				<Heading>About {channelData?.displayName}</Heading>
				<p className="flex text-foreground-secondary mb-2">
					<span className="font-semibold mr-1">
						{channelData?.followers?.[0]?.follower}
					</span>
					followers
				</p>
				<p className="hidden md:flex text-foreground-secondary mb-2">
					{channelData?.description}
				</p>
				<hr></hr>
				<div className="mt-4">
					<ul className="flex flex-wrap p-0">
						{Object.entries(socialLinks).map(([platform, url], index) => (
							<li key={index} className="flex items-center mr-1 lg:mr-4">
								<Link
									to={url}
									target="_blank"
									rel="noopener noreferrer"
									className="hover:bg-background-base rounded"
								>
									{getIcon(platform)}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default About;
