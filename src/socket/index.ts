import io from "socket.io-client"

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production" ? "" : "http://192.168.1.42:4008"

export const socket = io(URL, {
  autoConnect: false,
  transports: ["websocket", "polling", "flashsocket"],
})
