import type { Key } from '@models/Key'
import type { ILesson } from '@models/lessons/ILesson'

import axios from './axios'
import { HttpStatusCode } from 'axios'

import app from '@/main.ts'

abstract class Api {
	static async ping() {
		return await axios('ping')
	}

	static async fetchLessons(aup: Key, id: Key) {
		try {
			const { data } = await axios.get(`lessons`, {
				params: {
					aup,
					id,
				},
			})

			return data
		} catch (e) {
			app.config.globalProperties.$toast.add({
				severity: 'error',
				summary: 'Неизвестная ошибка.',
				detail: 'Произошла ошибка при подгрузке таблицы.',
				life: 2000,
			})

			console.log(e)
			return null
		}
	}

	/**
	 * Метод для сохранения строки
	 * @param id - Айди строки
	 * @param lesson - Обновленная строкоа
	 */
	static async saveLesson(id: Key, lesson: ILesson) {
		const { data, status } = await axios.post(`save-topic`, { id, lesson })

		if (status !== HttpStatusCode.Ok) return null

		return data
	}
}

Object.defineProperty(window, '_Api', { value: Api })

export default Api
