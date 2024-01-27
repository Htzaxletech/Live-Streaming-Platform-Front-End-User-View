import Heading from "@components/ui/Heading";
import { FaCheck, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface ProfileDescriptionProps {
	streamerName: string;
	followerCount: string;
	description: string;
	socialLinks: { [platform: string]: string };
}

const ProfileDescription: React.FC<ProfileDescriptionProps> = ({
	streamerName,
	followerCount,
	description,
	socialLinks,
}) => {
	const getIcon = (platform: string) => {
		switch (platform) {
			case "youtube":
				return (
					<div className="flex justify-center items-center text-foreground-secondary text-sm">
						<FaYoutube className="text-lg me-2" /> Youtube Channel{" "}
					</div>
				);
			case "facebook":
				return (
					<div className="flex justify-center items-center text-foreground-secondary text-sm">
						<FaFacebook className="text-lg me-2" /> Facebook{" "}
					</div>
				);
			case "instagram":
				return (
					<div className="flex justify-center items-center text-foreground-secondary text-sm">
						<FaInstagram className="text-lg me-2" /> Instagram{" "}
					</div>
				);

			default:
				return null;
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
							followers
						</span>
					</div>
					<p className="text-foreground-secondary font-light">
						{description}
					</p>
				</div>
				<hr className="opacity-25 mt-5 mb-3"></hr>
				<div>
					<ul className="flex flex-wrap">
						{Object.entries(socialLinks).map(([platform, url], index) => (
							<li key={index} className="flex items-center me-1 lg:me-4">
								<Link
									to={url}
									target="_blank"
									rel="noopener noreferrer"
									className="p-2 hover:bg-background-base rounded"
								>
									{getIcon(platform)}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ProfileDescription;
