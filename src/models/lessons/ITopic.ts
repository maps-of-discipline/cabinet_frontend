import type { Key } from '@models/Key'

export interface ITopic {
	chapter: string
	completed_task_link: string
	completed_task_link_name: string
	date: string
	date_task_finish: string
	date_task_finish_include: boolean
	discipline_table_id: Key
	id: Key
	id_type_control: Key
	lesson_order: number
	note: string
	place_note: '1215'
	spr_bells_id: Key
	spr_place_id: Key
	study_group_id: Key
	task_link: string
	task_link_name: string
	topic: string
}
