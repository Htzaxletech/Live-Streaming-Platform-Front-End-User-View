import HomeCarousel from "@components/shared/HomeCarousel";
import LivePage from "./LivePage";
import CategoryCardList from "./CategoryCardListPage";

const HomePage = () => {
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
			<div className="hidden md:block">
				<HomeCarousel data={data} />
			</div>
			<LivePage />
			<CategoryCardList />
		</div>
	);
};

export default HomePage;
