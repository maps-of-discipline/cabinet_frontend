import axios from 'axios'

// @ts-ignore
import app from '@/main.ts'

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API,
	withCredentials: true,
})

axiosInstance.interceptors.response.use(
	function (response) {
		return response
	},
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
