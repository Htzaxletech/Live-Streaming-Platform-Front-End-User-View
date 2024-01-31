import serviceFactory from "./serviceFactory"

const apiClient = {
  liveStream: serviceFactory("/live-streams.json"),
}

export { apiClient }
