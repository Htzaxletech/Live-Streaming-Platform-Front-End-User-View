/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import store from "store2";

console.log("baseURL", import.meta.env.VITE_API_URL);

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL as string, // Add other configuration options here
	headers: {
		"Cache-Control": "no-cache",
		"Accept": "application/json"
	},
});

// Add request interceptor for common headers or modifications
api.interceptors.request.use((config) => {
	// Add headers, authentication tokens, or any other modifications here
	
	// Assuming you have the token stored in localStorage
	const token = store.get("accessToken");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
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
