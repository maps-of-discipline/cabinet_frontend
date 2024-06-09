import type { Key } from '@models/Key'
import type { ITopic } from '@models/lessons/ITopic'

import { AxiosError, isAxiosError } from 'axios'
import axios from './axios'
import { HttpStatusCode } from 'axios'

// @ts-ignore
import app from '@/main.ts'

abstract class Api {
	static async ping() {
		return await axios('ping')
	}

	static async fetchLessons(
		aup: Key,
		id: Key,
		group: string,
		semester: number
	) {
		const { data } = await axios.get(`lessons`, {
			params: {
				aup,
				id,
				group,
				semester,
			},
		})

		if (data.error) throw new Error(data.error)

		console.log(data)

		return data
	}

	/**
	 * Метод для сохранения строки
	 * @param {Key} id - Айди строки
	 * @param {ITopic} lesson - Обновленная строкоа
	 */
	static async editLesson(lesson: ITopic) {
		const { data, status } = await axios.patch(`lesson`, {
			lesson,
		})

		if (status !== HttpStatusCode.Ok) return null

		return data
	}

	/**
	 * Метод для создания строки
	 * @param {Key} id - Айди строки
	 * @param {ITopic} lesson - Обновленная строкоа
	 */
	static async createLesson(lesson: ITopic) {
		const { data, status } = await axios.post(`lesson`, lesson)

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
		const { data, status } = await axios.delete(`lesson`, { params: { id } })

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
	static async fetchLessonControlTypes(disciplineTableId: Key) {
		const { data, status } = await axios.get(
			`control-types?id=${disciplineTableId}`
		)

		if (status !== HttpStatusCode.Ok) return null

		return data
	}

	static async fetchDisciplineInfo(id: Key) {
		const { data, status } = await axios.get(`discipline?id=${id}`)

		if (status !== HttpStatusCode.Ok) return null

		return data
	}

	static async fetchGroups(aup: Key) {
		const { data, status } = await axios.get('groups', {
			params: {
				aup,
			},
		})

		if (status !== HttpStatusCode.Ok) return null

		return data
	}

	static async fetchPlace() {
		const { data, status } = await axios.get(`place`)

		if (status !== HttpStatusCode.Ok) return null

		return data
	}

	static async fetchAup({ search, aup }: { search?: string; aup?: Key }) {
		const { data, status } = await axios.get(`aup`, {
			params: { search, aup },
		})

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
			const { data } = await axios.post(
				import.meta.env.VITE_API_KD + 'login/lk',
				payload
			)

			return { data }
		} catch (e) {
			const error = e as AxiosError<{ message: string }>

			if (error.code === AxiosError.ERR_NETWORK)
				return { error: 'Отсутствует подключение к интернету' }

			return { error: error.response?.data.message }
		}
	}

	static async getLkUsers() {
		const { data, status } = await axios.get(`lk-users`)

		if (status !== HttpStatusCode.Ok) return []

		return data
	}

	static async updateApproveUser(userId: Key, value: boolean) {
		const { data, status } = await axios.patch(`approve-user`, {
			id_user: userId,
			value,
		})

		if (status !== HttpStatusCode.Ok) return []

		return data
	}

	static async getUser(token: string) {
		const { data, status } = await axios.get(`user`, {
			params: {
				token,
			},
		})

		if (status !== HttpStatusCode.Ok) return []

		return data
	}

	static async getGroups() {
		const { data, status } = await axios.get(`groups`)

		if (status !== HttpStatusCode.Ok) return []

		return data
	}

	static async getGrades(aup: Key, id: Key, group: string, semester: number) {
		const { data, status } = await axios.get(`grades`, {
			params: {
				aup,
				id,
				group,
				semester,
			},
		})

		if (status !== HttpStatusCode.Ok)
			return { gradeTypes: [], disciplineTableId: null, rows: [], columns: [] }

		return data
	}

	static async createGradeTable(
		aup: Key,
		id: Key,
		group: string,
		semester: number
	) {
		const { data, status } = await axios.post(`grade-table`, {
			aup,
			id,
			group,
			semester,
		})

		if (status !== HttpStatusCode.Ok) return false

		return true
	}

	static async updateGrade(
		disciplineTableId: Key,
		value: number,
		colId: Key,
		studentId: Key
	) {
		const { data, status } = await axios.patch(`grade`, {
			discipline_table_id: disciplineTableId,
			value,
			grade_column_id: colId,
			student_id: studentId,
		})

		if (status !== HttpStatusCode.Ok) return []

		return data
	}

	static async updateVisibleColumns(gradeTypeId, visibleIds, hiddenIds) {
		const { data, status } = await axios.patch(`grade-column-visible`, {
			id: gradeTypeId,
			visible: visibleIds,
			hidden: hiddenIds,
		})

		if (status !== HttpStatusCode.Ok) return {}

		return data
	}

	static async updateGradeType(gradeType: any) {
		const { data, status } = await axios.patch(`grade-type`, gradeType)

		if (status !== HttpStatusCode.Ok) return {}

		return data
	}

	static async deleteGradeType(id: Key) {
		const { data, status } = await axios.delete(`grade-type`, {
			params: {
				id,
			},
		})

		if (status !== HttpStatusCode.Ok) return {}

		return data
	}

	static async createGradeType(gradeTypeSettings: any, disciplineTableId: Key) {
		const { data, status } = await axios.post(`grade-type`, {
			name: gradeTypeSettings.name,
			type: gradeTypeSettings.type,
			table_id: disciplineTableId,
		})

		if (status !== HttpStatusCode.Ok) return {}

		return data
	}

	static async uploadGroups(formdata) {
		const { data, status } = await axios.patch(`groups`, formdata)

		if (status !== HttpStatusCode.Ok) return []

		return data
	}

	static async getFaculties() {
		const { data, status } = await axios.get(`faculties`)

		if (status !== HttpStatusCode.Ok) return []

		return data
	}

	static async getDepartments() {
		const { data, status } = await axios.get(`departments`)

		if (status !== HttpStatusCode.Ok) return []

		return data
	}

	static async getStaff(division: string) {
		const { data, status } = await axios.get(`staff`, {
			params: {
				division,
			},
		})

		if (status !== HttpStatusCode.Ok) return []

		return data
	}

	static async getBells() {
		const { data, status } = await axios.get(`bells`)

		if (status !== HttpStatusCode.Ok) return []

		return data
	}

	static async updateBells(bells) {
		const { data, status } = await axios.patch(`bells`, bells)
		if (status !== HttpStatusCode.Ok) return {}
		return data
	}

	static async getReport(aup: Key, id: Key, group: string) {
		const { data, status } = await axios.get(`report`, {
			params: {
				aup,
				id,
				group,
			},
		})

		if (status !== HttpStatusCode.Ok) return []

		return data
	}

	static async downloadTutorOrder(payload) {
		const { data, status } = await axios(`download-tutor-order`, {
			method: 'POST',
			data: payload,
			responseType: 'blob',
		})

		if (status !== HttpStatusCode.Ok) return []

		// create file link in browser's memory
		const href = URL.createObjectURL(data)

		// create "a" HTML element with href to file & click
		const link = document.createElement('a')
		link.href = href
		link.setAttribute('download', 'Распоряжение_Тьюторы.docx') //or any other extension
		document.body.appendChild(link)
		link.click()

		// clean up "a" element & remove ObjectURL
		document.body.removeChild(link)
		URL.revokeObjectURL(href)

		return data
	}

	static async fetchTutorOrders({ id }: { id: Key }) {
		const { data, status } = await axios.get(`tutor-orders`, {
			params: { id },
		})

		if (status !== HttpStatusCode.Ok) return []

		return data
	}

	static async editTutorOrder(payload: any) {
		const { data, status } = await axios.patch(`tutor-order`, payload)

		if (status !== HttpStatusCode.Ok) return []

		return data
	}

	static async fetchFormOfEducations() {
		const { data, status } = await axios.get(`form-of-educations`)

		if (status !== HttpStatusCode.Ok) return []

		return data
	}

	static async downloadLessonsExcel(
		aup: Key,
		id: Key,
		group: string,
		semester: number
	) {
		const { data, status } = await axios.get(`performance-excel`, {
			params: {
				aup,
				id,
				group,
				semester,
			},
			responseType: 'blob',
		})

		if (status !== HttpStatusCode.Ok) return []

		return data
	}
}

Object.defineProperty(window, '_Api', { value: Api })

export default Api
