/**
 * Converts a Blob file to a base64 encoded string.
 *
 * @param {Blob} file - The Blob file to convert.
 * @returns {Promise<string>} - A Promise that resolves with the base64 encoded string.
 * @throws {Error} - If conversion fails.
 */
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

/**
 * Converts a given string to lowercase.
 *
 * @param {string} input - The input string.
 * @returns {string} - The lowercase version of the input string.
 */
export const convertToLowerCase = (input: string): string => {
	return input.toLowerCase();
};

/**
 * Generates a streaming URL based on the provided stream key.
 *
 * @param {string} streamKey - The stream key used in the URL.
 * @returns {string} - The generated streaming URL.
 */
export const generateStreamUrl = (streamKey: string): string => {
	const baseUrl = import.meta.env.VITE_STREAM_URL;
	const streamUrl = `${baseUrl}/live/${streamKey}/index.m3u8`;
	return streamUrl;
};

/**
 * Generates a random hex color code.
 *
 * @returns {string} - The random hex color code.
 */
export const getRandomColor = (): string => {
	return "#" + Math.floor(Math.random() * 16777215).toString(16);
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

export const chatTempData = [
	{
		userID: 1,
		message: "Hellow World, Testing chat message for production. Is it Okay?",
	},
	{
		userID: 2,
		message:
			"You are my sunshine. Bright for everything! Everything is Okay. Impossible is Nothing",
	},
	{
		userID: 3,
		message:
			"Why shoud u think about the animals? No I am not right This is testing",
	},
	{
		userID: 1,
		message: "I'm lonely and feel depressed",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
	{
		userID: 1,
		message: "testing",
	},
];

const channelList = [
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",
		displayName: "Alice",
	},
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",

		displayName: "Bob",
	},
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",

		displayName: "Charlie",
	},
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",

		displayName: "David",
	},
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",

		displayName: "Eva",
	},
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",

		displayName: "Frank",
	},
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",

		displayName: "Grace",
	},
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",

		displayName: "Henry",
	},
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",

		displayName: "Ivy",
	},
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",

		displayName: "Jack",
	},
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",
		displayName: "Liam",
	},
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",
		displayName: "Olivia",
	},
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",
		displayName: "Noah",
	},
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",
		displayName: "Emma",
	},
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",
		displayName: "Aiden",
	},
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",
		displayName: "Ava",
	},
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",
		displayName: "Caleb",
	},
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",
		displayName: "Sophia",
	},
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",
		displayName: "Logan",
	},
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",
		displayName: "Isabella",
	},
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",
		displayName: "Mia",
	},
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",
		displayName: "Ethan",
	},
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",
		displayName: "Ella",
	},
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",
		displayName: "Jackson",
	},
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",
		displayName: "Madison",
	},
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",
		displayName: "Mason",
	},
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",
		displayName: "Lily",
	},
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",
		displayName: "Lucas",
	},
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",
		displayName: "Chloe",
	},
	{
		bannerImage:
			"https://cdn.julieannesanjose.com/how_empty_was_blackpink_cocernt_world_tour.NcU5sNncLJ3BDj3eXVzpUy9R5ehxJFK9jZdhR-hVrnUFnPmbSmn3u_n2puXSxDfGeWlAPontAu_7dKsKXXeVXG51XxChaPeqpQ=w1200-h630-rj-pp-e365",
		displayName: "Harper",
	},
];