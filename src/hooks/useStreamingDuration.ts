import { useState, useEffect } from "react";

const useStreamingDuration = (startTimeString: string) => {
	const [duration, setDuration] = useState("");

	useEffect(() => {
		// Check if startTimeString is empty
		if (!startTimeString) {
			setDuration("00:00:00");
			return;
		}

		const startTime = new Date(startTimeString).getTime();
		const currentTime = new Date().getTime();

		// Check if the current time is before the start time
		if (currentTime < startTime) {
			setDuration("00:00:00");
			return;
		}

		const interval = setInterval(() => {
			const currentTime = new Date().getTime();
			const difference = currentTime - startTime;

			// Convert milliseconds to hours, minutes, and seconds
			const hours = Math.floor(difference / (1000 * 60 * 60))
				.toString()
				.padStart(2, "0");
			const minutes = Math.floor(
				(difference % (1000 * 60 * 60)) / (1000 * 60)
			)
				.toString()
				.padStart(2, "0");
			const seconds = Math.floor((difference % (1000 * 60)) / 1000)
				.toString()
				.padStart(2, "0");

			// Format the duration string
			const formattedDuration = `${hours}:${minutes}:${seconds}`;
			setDuration(formattedDuration);
		}, 1000);

		return () => clearInterval(interval);
	}, [startTimeString]);

	return duration;
};

export default useStreamingDuration;
