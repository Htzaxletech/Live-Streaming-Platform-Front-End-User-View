/* eslint-disable @typescript-eslint/no-explicit-any */
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

/**
 * Formats the given time string to display only hour and minute.
 *
 * @param {string} timeString - The time string to format.
 * @returns {string} - The formatted hour and minute string (HH:mm).
 */
export const formatHourAndMinute = (timeString: string): string => {
	const time = new Date(timeString);
	const hour = time.getHours();
	const minute = time.getMinutes();
	return `${hour}:${minute < 10 ? "0" + minute : minute}`;
};

/**
 * Truncates the given file name to the specified maximum length.
 *
 * @param {string} fileName - The file name to truncate.
 * @param {number} maxLength - The maximum length of the truncated file name.
 * @returns {string} - The truncated file name.
 */
export const truncateFileName = (
	fileName: string,
	maxLength: number
): string => {
	if (fileName.length > maxLength) {
		return fileName.slice(0, maxLength - 3) + "...";
	}
	return fileName;
};

/**
 * Converts an image from the provided URL to base64 format asynchronously.
 *
 * @param {string} imageUrl - The URL of the image to convert to base64.
 * @returns {Promise<string>} - A Promise that resolves with the base64 representation of the image.
 * @throws Will throw an error if there's an issue fetching or converting the image.
 */
export const convertImageUrlToBase64 = async (
	imageUrl: string
): Promise<string> => {
	try {
		const response = await fetch(imageUrl);
		const blob = await response.blob();
		const reader = new FileReader();

		return new Promise<string>((resolve, reject) => {
			reader.onload = () => {
				const base64data = reader.result;
				if (typeof base64data === "string") {
					resolve(base64data);
				} else {
					reject(new Error("Base64 data is not a string"));
				}
			};

			reader.onerror = (error) => {
				reject(error);
			};

			reader.readAsDataURL(blob);
		});
	} catch (error: any) {
		throw new Error("Error converting image to base64: " + error?.message);
	}
};

/**
 * Checks if the given URL is a Base64-encoded image or not.
 *
 * @param {string} url - The URL to check.
 * @returns {boolean} - True if the URL is a Base64-encoded image, false otherwise.
 */
export const isBase64URL = (url: string): boolean => {
	if (url.startsWith("data:image/") || url.startsWith("data:application/")) {
		const base64Regex = /^data:image\/([a-zA-Z]*);base64,([^\s]*)$/;
		return base64Regex.test(url);
	}
	return false;
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
