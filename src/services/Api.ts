import type { Key } from '@models/Key'
import type { ILesson } from '@models/lessons/ILesson'

import axios from './axios'
import { HttpStatusCode } from 'axios'

abstract class Api {
	static async ping() {
		return await axios('ping')
	}

	static async fetchLessons(aupCode: Key) {
		const { data, status } = await axios.get(`lessons/${aupCode}`)

		if (status !== HttpStatusCode.Ok) return null

		return data
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
