/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL as string, // Add other configuration options here
	headers: { "Access-Control-Allow-Origin": "*" },
});

// Add request interceptor for common headers or modifications
api.interceptors.request.use((config) => {
	// Add headers, authentication tokens, or any other modifications here
	return config;
});

// Add response interceptor for handling common responses or errors
api.interceptors.response.use(
	(response) => {
		// Handle successful responses here
		return response;
	},
	(error) => {
		// Handle errors here
		return Promise.reject(error);
	}
);

export default api;
