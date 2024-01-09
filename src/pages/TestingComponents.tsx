import { GoPerson } from "react-icons/go";

import Button from "@components/ui/Button";
import { CategoryLink } from "@components/ui/CategoryLink";
import Tag from "@components/ui/Tag";
import Icon from "@components/shared/Icon";

import categoryimg from "../assets/images/gaming.svg";

import { BsStars } from "react-icons/bs";
import { FaArrowDownWideShort } from "react-icons/fa6";

import { SocialLink } from "@components/ui/SocialLink";
import { Select } from "@components/ui/Select";
import Avatar from "@components/ui/Avatar";
import ProfileAvatar from "@components/ui/ProfileAvatar";
import ProfileHeading from "@components/shared/ProfileHeading";
import ProfileDescription from "@components/shared/ProfileDescription";
import ProfileStreamInfo from "@components/shared/ProfileStreamInfo";
import HomeCarousel from "@components/shared/HomeCarousel";

const TestingComponents = () => {
	const options = [
		{ option: "Recommended for you", value: "1", icon: <BsStars /> },
		{
			option: "Views(high to low)",
			value: "2",
			icon: <FaArrowDownWideShort />,
		},
	];

	const data = [
		{
			coverImage:
				"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
			video: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
		},
		{
			coverImage:
				"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
			video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
		},
		{
			coverImage:
				"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
			video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
		},
		{
			coverImage:
				"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
			video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
		},
		{
			coverImage:
				"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
			video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
		},
		{
			coverImage:
				"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg",
			video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
		},
	];

	return (
		<div className="py-10 pb-16 px-4">
			<HomeCarousel data={data} />
			<div className="flex gap-5 flex-col w-fit">
				<div className="flex p-5 gap-10">
					<Button color="default">Default</Button>
					<a
						data-tooltip-id="my-tooltip"
						data-tooltip-content="Tooltip"
						data-tooltip-place="top"
					>
						<Button color="primary">With Tooltip</Button>
					</a>
					<CategoryLink
						to="http://www.google.com"
						color="default"
						size="md"
						icon={<img src={categoryimg} alt="icon" />}
					>
						Games
					</CategoryLink>
				</div>

				<div>
					<ProfileStreamInfo
						isLive={false}
						message={"Check out this mobile legends: Bang Bang"}
						viewer={"52k"}
					/>
				</div>

				<div className="flex p-5 gap-2.5">
					<Tag to="/directory">Directory</Tag>
					<Icon icon={GoPerson} className="text-primary" />
				</div>
			</div>

			<CategoryLink
				to="http://www.google.com"
				color="default"
				size="md"
				icon={<img src={categoryimg} alt="icon" />}
			>
				Games
			</CategoryLink>

			<div className="float-right">
				<Select options={options} />
			</div>

			<Avatar />

			<ProfileHeading
				streamerName="GeminiTay"
				streamTitle="Stardew Sunday! We are back in spring year 2 :)"
				gameName="Stardew Valley"
				gameTags={["funny", "kid", "English"]}
				viewers={10}
				time={"20:00:11"}
			/>
			<ProfileDescription
				streamerName="GeminiTay"
				followerCount={"211K"}
				description={
					"Canadian gaming Youtuber and Twitch Streamer. I play Minecraft with a focus on building and creating art in the game."
				}
				socialLinks={{
					facebook: "www.facebook.com/username",
					instagram: "www.instagram.com/username",
					youtube: "www.youtube.com/username",
				}}
			/>

			<ProfileAvatar
				imageUrl="https://th.bing.com/th/id/R.8b167af653c2399dd93b952a48740620?rik=%2fIwzk0n3LnH7dA&pid=ImgRaw&r=0"
				altText="User Avatar"
				isLive={true}
				size={50}
			/>

			<div className="flex space-x-4">
				<SocialLink platform="facebook" username="example" />
				<SocialLink platform="linkedin" username="example" />
				<SocialLink platform="twitter" username="example" />
			</div>
		</div>
	);
};

export default TestingComponents;
