import type { Key } from '@models/Key'
import type { IFetchLessons } from '@models/lessons/IFetchLessons'
import type { ILesson } from '@models/lessons/ILesson'

import { reactive, ref } from 'vue'

import Api from '@services/Api'

class LessonsService {
	/* TODO Сделать MapID структуру для прямого доступа, редактирования, удаления и т.д. */
	lessons: { items: ILesson[] } = reactive({
		items: [],
	})

	aup: Key | null = null
	disciplineId: Key | null = null
	rpdId: Key | null = null
	title: string = ''

	/**
	 * @desc Метод для подгрузки списка занятий
	 * @param aup - АУП по которому нужно получить список занятий
	 * @param id - Айди уникальной дисциплины
	 */
	async fetchLessons(aup: Key, id: Key): Promise<ILesson[] | null> {
		const data: IFetchLessons | null = await Api.fetchLessons(aup, id)
		if (!data) return []

		this.setLessonItems(data.topics)

		this.aup = aup
		this.disciplineId = id
		this.rpdId = data.rpd_id
		this.title = data.title

		return data.topics
	}

	setLessonItems(lessons: ILesson[]) {
		this.lessons.items = lessons
	}

	async editLesson(id: Key, lesson: ILesson) {
		const data: ILesson | null = await Api.saveLesson(id, lesson)
		if (!data) return null

		const indexToUpdate = this.lessons.items.findIndex(
			lesson => lesson.id === id
		)
		if (indexToUpdate === -1) return null

		this.lessons[indexToUpdate] = data
	}

	addEmptyRow() {
		if (!this.rpdId) return

		this.lessons.items.push({
			id: 'empty',
			id_rpd: this.rpdId,
			id_type_control: null,
			chapter: '',
			task_link: '',
			topic: '',
		})
	}
}

const lessonsService = new LessonsService()

Object.defineProperty(window, '_lessonsService', { value: lessonsService })

export default lessonsService
