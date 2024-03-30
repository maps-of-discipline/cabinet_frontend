import type { Key } from '@models/Key'
import type { IFetchLessons } from '@models/lessons/IFetchLessons'
import type { ILesson } from '@models/lessons/ILesson'
import type {
	IFetchLessonControls,
	ILessonControls,
} from '@models/lessons/IFetchLessonControls'

import { reactive, ref } from 'vue'

import Api from '@services/Api'

class LessonsService {
	/* TODO Сделать MapID структуру для прямого доступа, редактирования, удаления и т.д. */
	lessons: { items: ILesson[] } = reactive({
		items: [],
	})

	controlTypes: { value: ILessonControls } = reactive({
		value: [],
	})

	private readonly prefixLocalId: string = 'local_'

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

		await this.fetchControlTypes(data.rpd_id)

		return data.topics
	}

	setLessonItems(lessons: ILesson[]) {
		this.lessons.items = lessons
	}

	async editLesson(lesson: ILesson) {
		if (this.isLocalLesson(lesson.id)) return await this.createLesson(lesson)

		console.log(lesson)

		const editedLesson: ILesson | null = await Api.editLesson(lesson)
		if (!editedLesson) return null

		return this.editLocalLesson(lesson.id, editedLesson)
	}

	async createLesson(lesson: ILesson) {
		if (!this.isLocalLesson(lesson.id)) return null

		const createdLesson: ILesson | null = await Api.createLesson(lesson)
		if (!createdLesson) return null

		return this.editLocalLesson(lesson.id, createdLesson)
	}

	async deleteLesson(id: Key) {
		if (!id) return null

		if (this.isLocalLesson(id)) return this.deleteLocalLesson(id)

		const data: ILesson | null = await Api.deleteLesson(id)
		if (data) {
			return this.deleteLocalLesson(id)
		} else {
			return null
		}
	}

	/* 
        Блок методов для работы с локальным состоянием     
    */

	createLocalLesson(semester: number) {
		if (!this.rpdId) return

		this.lessons.items.push({
			id: this.prefixLocalId + Date.now(),
			id_rpd: this.rpdId,
			id_type_control: null,
			chapter: '',
			task_link: '',
			task_link_name: '',
			completed_task_link: '',
			completed_task_link_name: '',
			topic: '',
			semester,
		})
	}

	deleteLocalLesson(id: Key) {
		this.lessons.items = this.lessons.items.filter(item => item.id !== id)
	}

	editLocalLesson(id: Key, newLesson: ILesson) {
		const indexToUpdate = this.lessons.items.findIndex(item => item.id === id)
		if (indexToUpdate === -1) return null

		this.lessons.items[indexToUpdate] = newLesson

		return newLesson
	}

	/*  */

	/**
	 * @desc Прооверка на локальносозданную запись
	 * @param {Key} id - id записи которую нужно проерить
	 * @returns
	 */
	isLocalLesson(id: Key) {
		return `${id}`.startsWith(this.prefixLocalId)
	}

	async fetchControlTypes(rpdId) {
		const data: IFetchLessonControls | null = await Api.fetchLessonControlTypes(
			rpdId
		)

		if (!data) return []

		this.setControlTypes(data.control_types)
	}

	setControlTypes(controlTypes) {
		this.controlTypes.value = controlTypes
	}
}

const lessonsService = new LessonsService()

Object.defineProperty(window, '_lessonsService', { value: lessonsService })

export default lessonsService
