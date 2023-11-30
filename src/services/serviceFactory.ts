import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL

export default (path: string) => {
  return {
    get: async (config?: any) => {
      try {
        const res = await axios.get(`${apiUrl}/${path}`, config)
        return res.data
      } catch (error) {
        throw error
      }
    },
    post: () => {},
    put: () => {},
    delete: () => {},
  }
}
