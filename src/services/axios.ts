import axios from 'axios'

// @ts-ignore
import app from '@/main.ts'

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API,
	withCredentials: true,
})

axiosInstance.interceptors.request.use(config => {
	config.headers.Authorization =
		localStorage.getItem('access') || sessionStorage.getItem('access') || ''

	return config
})

axiosInstance.interceptors.response.use(
	response => response,
	error => {
		app.config.globalProperties.$toast.add({
			severity: 'error',
			summary: 'Неизвестная ошибка.',
			detail: 'Произошла ошибка при подгрузке данных.',
			life: 2000,
		})

		return Promise.reject(error)
	}
)

Object.defineProperty(window, '_axiosInstance', { value: axiosInstance })

export default axiosInstance
