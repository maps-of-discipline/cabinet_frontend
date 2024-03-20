import type { Key } from '@models/Key'
import type { ILesson } from '@models/lessons/ILesson'

import Api from '@services/Api'

class LessonsService {
	/* Сделать MapID структуру для прямого доступа, редактирования, удаления и т.д. */
	lessons: ILesson[] = []

	/**
	 * @desc Метод для подгрузки списка занятий
	 * @param aupCode - АУП по которому нужно получить список занятий
	 */
	async fetchLessons(aupCode: Key): Promise<ILesson[] | null> {
		const data: ILesson[] | null = await Api.fetchLessons(aupCode)
		if (!data) return []

		this.setLessons(data)

		return data
	}

	/**
	 * Метод установки списка занятий
	 * @param {ILesson[]} lessons
	 */
	setLessons(lessons: ILesson[]) {
		this.lessons = lessons
	}

	async editLesson(id: Key, lesson: ILesson) {
		const data: ILesson | null = await Api.saveLesson(id, lesson)
		if (!data) return null

		const indexToUpdate = this.lessons.findIndex(lesson => lesson.id === id)
		if (indexToUpdate === -1) return null

		this.lessons[indexToUpdate] = data
	}
}

const lessonsService = new LessonsService()

Object.defineProperty(window, '_lessonsService', { value: lessonsService })

export default lessonsService
