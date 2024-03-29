import io from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
// const URL =
//   process.env.NODE_ENV === "production" ? "" : "http://192.168.1.31:4008"

const URL = import.meta.env.VITE_SOCKET_URL;

export const socket = io(URL, {
	autoConnect: true,
	// transports: ["websocket", "polling", "flashsocket"],
	transports: ["websocket"],
});
