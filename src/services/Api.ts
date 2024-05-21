import type { Key } from '@models/Key'
import type { ILesson } from '@models/lessons/ILesson'

import { AxiosError, isAxiosError } from 'axios'
import axios from './axios'
import { HttpStatusCode } from 'axios'

// @ts-ignore
import app from '@/main.ts'

abstract class Api {
	static async ping() {
		return await axios('ping')
	}

	static async fetchLessons(aup: Key, id: Key) {
		try {
			/* await new Promise(r => setTimeout(r, 3000)) */

			const { data } = await axios.get(`lessons`, {
				params: {
					aup,
					id,
				},
			})

			if (data.error) throw new Error(data.error)

			console.log(data)

			return data
		} catch (error) {
			if (isAxiosError(error) && !error) {
				app.config.globalProperties.$toast.add({
					severity: 'error',
					summary: 'Неизвестная ошибка.',
					detail: 'Произошла ошибка при подгрузке таблицы.',
					life: 2000,
				})
			} else {
				app.config.globalProperties.$toast.add({
					severity: 'error',
					summary: error as string,
					life: 2000,
				})
			}

			console.error(error)
			return null
		}
	}

	/**
	 * Метод для сохранения строки
	 * @param {Key} id - Айди строки
	 * @param {ILesson} lesson - Обновленная строкоа
	 */
	static async editLesson(lesson: ILesson) {
		const { data, status } = await axios.post(`edit-lesson`, {
			lesson,
		})

		if (status !== HttpStatusCode.Ok) return null

		return data
	}

	/**
	 * Метод для создания строки
	 * @param {Key} id - Айди строки
	 * @param {ILesson} lesson - Обновленная строкоа
	 */
	static async createLesson(lesson: ILesson) {
		const { data, status } = await axios.post(`create-lesson`, lesson)

		if (status !== HttpStatusCode.Ok) return null

		app.config.globalProperties.$toast.add({
			severity: 'success',
			summary: 'Новая запись успешно сохранена.',
			life: 2000,
		})

		return data
	}

	/**
	 * Метод для удаления строки
	 * @param {Key} id - Айди строки
	 */
	static async deleteLesson(id: Key) {
		const { data, status } = await axios.post(`delete-lesson`, { id })

		if (status !== HttpStatusCode.Ok) return null

		app.config.globalProperties.$toast.add({
			severity: 'success',
			summary: 'Запись успешно удалена.',
			life: 2000,
		})

		return data
	}

	/**
	 * Метод для получения доступных нагрузок РПД
	 * @param {Key} id - Айди РПД
	 */
	static async fetchLessonControlTypes(rpdId: Key) {
		const { data, status } = await axios.get(`control_types?rpd=${rpdId}`)

		if (status !== HttpStatusCode.Ok) return null

		return data
	}

	static async fetchAupsBySearch(value: string) {
		const { data, status } = await axios.get(`aup?search=${value}`)

		if (status !== HttpStatusCode.Ok) return []

		return data
	}

	static async fetchDisciplinesByAup(aup: string) {
		const { data, status } = await axios.get(`disciplines?aup=${aup}`)

		if (status !== HttpStatusCode.Ok) return []

		return data
	}

	static async fetchDisciplines(aup: string) {
		const { data, status } = await axios.get(`disciplines-new?aup=${aup}`)

		if (status !== HttpStatusCode.Ok) return {}

		return data
	}

	static async login(payload: any) {
		try {
			const { data } = await axios.post(`auth`, payload)

			return { data }
		} catch (e) {
			const error = e as AxiosError<{ message: string }>

			if (error.code === AxiosError.ERR_NETWORK)
				return { error: 'Отсутствует подключение к интернету' }

			return { error: error.response?.data.message }
		}
	}

	static async getUser(token: string) {
		const { data, status } = await axios.post(`getUser`, { token })

		if (status !== HttpStatusCode.Ok) return []

		return data
	}

	static async getGroups() {
		const { data, status } = await axios.get(`getGroups`)

		if (status !== HttpStatusCode.Ok) return []

		return data
	}

	static async getGrades(aup: Key, id: Key, group: string, semester: number) {
		const { data, status } = await axios.get(`get-grades`, {
			params: {
				aup,
				id,
				group,
				semester,
			},
		})

		if (status !== HttpStatusCode.Ok)
			return { gradeTypes: [], gradeTableId: null, rows: [], columns: [] }

		return data
	}

	static async createGradeTable(
		aup: Key,
		id: Key,
		group: string,
		semester: number
	) {
		const { data, status } = await axios.get(`create-grade-table`, {
			params: {
				aup,
				id,
				group,
				semester,
			},
		})

		if (status !== HttpStatusCode.Ok) return false

		return true
	}

	static async updateGrade(
		gradeTableId: Key,
		value: number,
		colId: Key,
		studentId: Key
	) {
		const { data, status } = await axios.post(`updateGrade`, {
			grade_table_id: gradeTableId,
			value,
			grade_column_id: colId,
			student_id: studentId,
		})

		if (status !== HttpStatusCode.Ok) return []

		return data
	}

	static async updateGradeType(gradeType: any) {
		const { data, status } = await axios.post(`update-grade-type`, gradeType)

		if (status !== HttpStatusCode.Ok) return {}

		return data
	}

	static async createGradeType(gradeTypeSettings: any, gradeTableId: Key) {
		const { data, status } = await axios.post(`create-grade-type`, {
			name: gradeTypeSettings.name,
			table_id: gradeTableId,
		})

		if (status !== HttpStatusCode.Ok) return {}

		return data
	}

	static async uploadGroups(formdata) {
		const { data, status } = await axios.post(`uploadGroups`, formdata)

		if (status !== HttpStatusCode.Ok) return []

		return data
	}
}

Object.defineProperty(window, '_Api', { value: Api })

export default Api
