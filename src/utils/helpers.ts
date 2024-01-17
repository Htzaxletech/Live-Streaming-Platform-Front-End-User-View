export const convertToBase64 = (file: Blob): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.readAsDataURL(file);

		reader.onload = () => {
			if (reader.result) {
				resolve(reader.result.toString());
			} else {
				reject(new Error("Failed to convert to base64"));
			}
		};

		reader.onerror = (error) => {
			reject(error);
		};
	});
};

export const generateStreamUrl = (streamKey: string) => {
	const baseUrl = import.meta.env.VITE_STREAM_URL;
	const streamUrl = `${baseUrl}/live/${streamKey}/index.m3u8`;
	return streamUrl;
};

export const videoSliderData = [
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

export const tempData = [
	{
		StreamInfoID: 2,
		categoryID: 1,
		channelID: 2,
		streamKey: "0r6fyRXaj",
		video: "http://localhost:8888/live/0r6fyRXaj/index.m3u8",
		coverImage:
			"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
		bio: "I am a developer",
		channelName: "Min",
		title: "This is streaming",
		categoryName: "Basketball",
		tags: [
			{
				tagID: 1,
				tagName: "RPG Ball",
			},
			{
				tagID: 2,
				tagName: "Strategy",
			},
		],
	},
	{
		StreamInfoID: 2,
		categoryID: 1,
		channelID: 2,
		streamKey: "0r6fyRXaj",
		video: "http://localhost:8888/live/0r6fyRXaj/index.m3u8",
		coverImage:
			"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
		bio: "I am a developer",
		channelName: "Min",
		title: "This is streaming",
		categoryName: "Basketball",
		tags: [
			{
				tagID: 1,
				tagName: "RPG Ball",
			},
			{
				tagID: 2,
				tagName: "Strategy",
			},
		],
	},
	{
		StreamInfoID: 2,
		categoryID: 1,
		channelID: 2,
		streamKey: "0r6fyRXaj",
		video: "http://localhost:8888/live/0r6fyRXaj/index.m3u8",
		coverImage:
			"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
		bio: "I am a developer",
		channelName: "Min",
		title: "This is streaming",
		categoryName: "Basketball",
		tags: [
			{
				tagID: 1,
				tagName: "RPG Ball",
			},
			{
				tagID: 2,
				tagName: "Strategy",
			},
		],
	},
	{
		StreamInfoID: 2,
		categoryID: 1,
		channelID: 2,
		streamKey: "0r6fyRXaj",
		video: "http://localhost:8888/live/0r6fyRXaj/index.m3u8",
		coverImage:
			"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
		bio: "I am a developer",
		channelName: "Min",
		title: "This is streaming",
		categoryName: "Basketball",
		tags: [
			{
				tagID: 1,
				tagName: "RPG Ball",
			},
			{
				tagID: 2,
				tagName: "Strategy",
			},
		],
	},
	{
		StreamInfoID: 2,
		categoryID: 1,
		channelID: 2,
		streamKey: "0r6fyRXaj",
		video: "http://localhost:8888/live/0r6fyRXaj/index.m3u8",
		coverImage:
			"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
		bio: "I am a developer",
		channelName: "Min",
		title: "This is streaming",
		categoryName: "Basketball",
		tags: [
			{
				tagID: 1,
				tagName: "RPG Ball",
			},
			{
				tagID: 2,
				tagName: "Strategy",
			},
		],
	},
	{
		StreamInfoID: 2,
		categoryID: 1,
		channelID: 2,
		streamKey: "0r6fyRXaj",
		video: "http://localhost:8888/live/0r6fyRXaj/index.m3u8",
		coverImage:
			"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
		bio: "I am a developer",
		channelName: "Min",
		title: "This is streaming",
		categoryName: "Basketball",
		tags: [
			{
				tagID: 1,
				tagName: "RPG Ball",
			},
			{
				tagID: 2,
				tagName: "Strategy",
			},
		],
	},
];
