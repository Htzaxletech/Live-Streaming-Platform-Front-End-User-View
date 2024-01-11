/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig, AxiosResponse } from "axios";
import api from "./api";
import { toast } from "react-toastify";

// Common function to handle request errors
export const handleRequestError = (error: any): void => {
	if (error.response) {
		// The request was made and the server responded with a status code
		console.error(
			"Response Error:",
			error.response.status,
			error.response.data
		);
		toast.error(
			"The request was made and the server responded with a status code"
		);
	} else if (error.request) {
		// The request was made but no response was received
		console.error("Request Error:", error.request);
		toast.error("The request was made but no response was received");
	} else {
		// Something happened in setting up the request that triggered an Error
		console.error("Error:", error.message);
		toast.error(
			"Something happened in setting up the request that triggered an Error"
		);
	}
	throw error;
};

// Single request function
export const makeRequest = async <T>(
	method: string,
	url: string,
	data?: any,
	config?: AxiosRequestConfig
): Promise<T> => {
	try {
		const response: AxiosResponse<T> = await api.request<T>({
			method,
			url,
			...(method === "get" || method === "GET"
				? { params: data }
				: { data }),
			...config,
		});

		return response.data;
	} catch (error) {
		handleRequestError(error);
		throw error; // Propagate the error
	}
};

// Multiple requests function
export const makeMultipleRequests = async <T>(
	requests: Array<{
		method: string;
		url: string;
		data?: any;
		config?: AxiosRequestConfig;
	}>
): Promise<T[]> => {
	try {
		const promises = requests.map(async (request) => {
			const { method, url, data, config } = request;
			const response: AxiosResponse<T> = await api.request<T>({
				method,
				url,
				...(method === "get" || method === "GET"
					? { params: data }
					: { data }),
				...config,
			});
			return response.data;
		});

		const results = await Promise.all(promises);
		return results;
	} catch (error) {
		handleRequestError(error);
		throw error; // Propagate the error
	}
};