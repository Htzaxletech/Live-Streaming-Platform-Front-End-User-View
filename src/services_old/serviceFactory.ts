import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL

export default (path: string) => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get: async (config?: any) => {
      // eslint-disable-next-line no-useless-catch
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
