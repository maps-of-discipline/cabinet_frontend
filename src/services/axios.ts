import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API,
  withCredentials: true,
})

Object.defineProperty(window, '_axiosInstance', { value: axiosInstance })

export default axiosInstance
