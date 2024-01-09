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
import LivePage from "./LivePage";
import CategoryCardList from "./CategoryCardListPage";

const HomePage = () => {
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
		<div className="container mx-auto py-10 pb-16 px-4">
			<HomeCarousel data={data} />
			<LivePage />
			<CategoryCardList />
		</div>
	);
};

export default HomePage;
